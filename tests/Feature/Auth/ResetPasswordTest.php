<?php

namespace Tests\Feature\Auth;

use App\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Tests\JwtTestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class RegisterUserTest extends JwtTestCase
{
    use DatabaseMigrations, DatabaseTransactions;

    protected $urlPasswordReset;
    protected $urlPasswordForgot;

    public function setUp()
    {
        parent::setUp();
        $this->urlPasswordReset = route('user.password.reset');
        $this->urlPasswordForgot = route('user.password.forgot');
    }

    /**
     * @test
     */
    public function guest_cant_forgot_password_if_user_does_not_exists()
    {
        $response = $this->json('POST', $this->urlPasswordForgot, ['email' => 'someuserthatnotexists@test.com']);
        $response->assertStatus(422)->assertJsonStructure(['email' => []]);
    }

    /**
     * @test
     */
    public function guest_cant_forgot_password_if_user_not_verified()
    {
        $user = factory(User::class)->create();
        $response = $this->json('POST', $this->urlPasswordForgot, ['email' => $user->email]);
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
        $response = $this->json('POST', $this->urlPasswordForgot, ['email' => $user->email]);
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
        $response = $this->json('POST', $this->urlPasswordReset, ['email' => 'someuserthatnotexists@test.com']);
        $response->assertStatus(422)->assertJsonStructure(['email' => []]);
    }

    /**
     * @test
     */
    public function cant_reset_password_if_incorrect_token()
    {
        $user = factory(User::class)->create();
        $user->is_verified = true;
        $user->save();
        $token = Password::broker()->createToken($user);
        \DB::table(config('auth.passwords.users.table'))->insert([
            'email' => $user->email,
            'token' => $token,
        ]);
        $response = $this->json('POST', $this->urlPasswordReset, [
            'email' => $user->email,
            'token' => 'incorrect_token',
            'password' => '1a2b3c',
            'password_confirmation' => '1a2b3c'
        ]);
        $response->assertStatus(422)->assertJsonStructure(['token' => []]);
    }

    /**
     * @test
     */
    public function cant_reset_password_if_token_is_expired()
    {
        $user = factory(User::class)->create();
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
        $response = $this->json('POST', $this->urlPasswordReset, [
            'email' => $user->email,
            'token' => $token,
            'password' => '1a2b3c',
            'password_confirmation' => '1a2b3c'
        ]);
        $response->assertStatus(422)->assertJsonStructure(['token' => []]);
    }

    /**
     * @test
     */
    public function success_reset_password()
    {
        $user = factory(User::class)->make(['password' => 'secret123']);
        $user->is_verified = true;
        $user->save();
        $token = Password::broker()->createToken($user);
        \DB::table(config('auth.passwords.users.table'))->insert([
            'email' => $user->email,
            'token' => $token
        ]);
        $response = $this->json('POST', $this->urlPasswordReset, [
            'email' => $user->email,
            'token' => $token,
            'password' => '1a2b3c',
            'password_confirmation' => '1a2b3c'
        ]);
        $response->assertStatus(200);
        $user = User::where(['id' => $user->id])->first();
        $this->assertTrue(app('hash')->check('1a2b3c', $user->password));
    }


    /**
     * @test
     */
    public function cant_reset_password_if_password_invalid()
    {
        $user = factory(User::class)->create();
        $user->is_verified = true;
        $user->save();
        $token = Password::broker()->createToken($user);
        \DB::table(config('auth.passwords.users.table'))->insert([
            'email' => $user->email,
            'token' => $token,
            'created_at' => date('Y-m-d H:i', time())
        ]);
        $response = $this->json('POST', $this->urlPasswordReset, [
            'email' => $user->email,
            'token' => $token,
            'password' => '1a2b3c',
            'password_confirmation' => ''
        ]);
        $response->assertStatus(422)->assertJsonStructure(['password' => []]);

        $response = $this->json('POST', $this->urlPasswordReset, [
            'email' => $user->email,
            'token' => $token,
            'password' => '',
            'password_confirmation' => ''
        ]);
        $response->assertStatus(422)->assertJsonStructure(['password' => []]);

        $response = $this->json('POST', $this->urlPasswordReset, [
            'email' => $user->email,
            'token' => $token,
            'password' => '1a2b',
            'password_confirmation' => '1a2b'
        ]);
        $response->assertStatus(422)->assertJsonStructure(['password' => []]);
    }
}
