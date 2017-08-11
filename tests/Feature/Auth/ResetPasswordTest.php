<?php

namespace Tests\Feature\Auth;

use App\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Password;
use Tests\JwtTestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class RegisterUserTest extends JwtTestCase
{
    use DatabaseMigrations, DatabaseTransactions;

    const DEFAULT_EMAIL = 'default.email@example.com';

    protected $urlPasswordReset;
    protected $urlPasswordForgot;
    public function setUp()
    {
        parent::setUp();
        $this->urlPasswordReset = route('password.reset', ['email' => self::DEFAULT_EMAIL]);
        $this->urlPasswordForgot = route('authorization');
    }

    /**
     * @test
     */
    public function guest_cant_forgot_password_if_user_does_not_exists()
    {
        $response = $this->json('POST', $this->urlPasswordForgot, [
            'email' => 'someuserthatnotexists@test.com',
            'type' => 'reset-password'
        ]);
        $response->assertStatus(422)->assertJsonStructure(['email' => []]);
    }

    /**
     * @test
     */
    public function guest_cant_forgot_password_if_user_not_verified()
    {
        $user = factory(User::class)->create();
        $response = $this->json('POST', $this->urlPasswordForgot, [
            'email' => $user->email,
            'type' => 'reset-password'
        ]);
        $response->assertStatus(422)->assertJsonStructure(['email' => []]);
    }

    /**
     * @test
     */
    public function guest_forgot_password()
    {
        $user = factory(User::class)->create();
        $user->is_verified = true;
        $user->save();

        $this->assertDatabaseMissing(
            config('auth.passwords.users.table'),
            [
                'email' => $user->email
            ]
        );
        $response = $this->json('POST', $this->urlPasswordForgot, [
            'email' => $user->email,
            'type' => 'reset-password'
        ]);
        $response->assertStatus(200);
        $this->assertDatabaseHas(
            config('auth.passwords.users.table'),
            [
                'email' => $user->email
            ]
        );
    }

    /**
     * @test
     */
    public function cant_reset_password_if_incorrect_email()
    {
        $response = $this->json('PUT', route('password.reset', ['email' => 'someuserthatnotexists@test.com']), [
            'password' => '1a2b3c'
        ], ['Token' => 'sometoken']);
        $response->assertStatus(422)->assertJsonStructure(['email' => []]);
    }

    /**
     * @test
     */
    public function cant_reset_password_if_incorrect_token()
    {
        $user = factory(User::class)->make(['email' => self::DEFAULT_EMAIL]);
        $user->is_verified = true;
        $user->save();
        $token = Password::broker()->createToken($user);
        \DB::table(config('auth.passwords.users.table'))->insert([
            'email' => $user->email,
            'token' => $token,
        ]);
        $response = $this->json('PUT', $this->urlPasswordReset, [
            'password' => '1a2b3c',
            'test' => 'test',
        ], ['Token' => 'incorrect_token']);
        $response->assertStatus(422)->assertJsonStructure(['token' => []]);
    }

    /**
     * @test
     */
    public function cant_reset_password_if_token_is_expired()
    {
        $user = factory(User::class)->make(['email' => self::DEFAULT_EMAIL]);
        $user->is_verified = true;
        $user->save();
        $token = Password::broker()->createToken($user);
        \DB::table(config('auth.passwords.users.table'))->insert([
            'email' => $user->email,
            'token' => $token,
        ]);
        \DB::table(config('auth.passwords.users.table'))
            ->where('email', $user->email)
            ->update(['created_at' => Carbon::now()->subHours(24)]);
        $response = $this->json('PUT', $this->urlPasswordReset, [
            'password' => '1a2b3c',
        ], ['Token' => $token]);
        $response->assertStatus(422)->assertJsonStructure(['token' => []]);
    }

    /**
     * @test
     */
    public function success_reset_password()
    {
        $user = factory(User::class)->make(['password' => 'secret123', 'email' => self::DEFAULT_EMAIL]);
        $user->is_verified = true;
        $user->save();
        $token = Password::broker()->createToken($user);
        \DB::table(config('auth.passwords.users.table'))->insert([
            'email' => $user->email,
            'token' => $token
        ]);
        $response = $this->json('PUT', $this->urlPasswordReset, [
            'password' => '1a2b3c'
        ], ['Token' => $token]);
        $response->assertStatus(200);
        $user = User::where(['id' => $user->id])->first();
        $this->assertTrue(app('hash')->check('1a2b3c', $user->password));
    }


    /**
     * @test
     */
    public function cant_reset_password_if_password_invalid()
    {
        $user = factory(User::class)->create(['email' => self::DEFAULT_EMAIL]);
        $user->is_verified = true;
        $user->save();
        $token = Password::broker()->createToken($user);
        \DB::table(config('auth.passwords.users.table'))->insert([
            'email' => $user->email,
            'token' => $token,
        ]);
        $response = $this->json('PUT', $this->urlPasswordReset, [
            'password' => '',
        ], ['Token' => $token]);
        $response->assertStatus(422)->assertJsonStructure(['password' => []]);
    }
}
