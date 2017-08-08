<?php

namespace Tests\Feature\Auth;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class RegisterUserTest extends TestCase
{
    use DatabaseMigrations, DatabaseTransactions;

    /**
     * @test
     */
    public function guest_cant_register_if_not_all_required_fields_is_filled()
    {
        $response = $this->json('POST', '/api/user/register', []);
        $response->assertStatus(422);

        $response = $this->json('POST', '/api/user/register',
            factory(User::class)->make(['first_name' => null])->toArray());
        $response->assertStatus(422)->assertJsonStructure(['first_name' => []]);

        $response = $this->json('POST', '/api/user/register',
            factory(User::class)->make(['last_name' => null])->toArray());
        $response->assertStatus(422)->assertJsonStructure(['last_name' => []]);

        $response = $this->json('POST', '/api/user/register', factory(User::class)->make(['email' => null])->toArray());
        $response->assertStatus(422)->assertJsonStructure(['email' => []]);

        $response = $this->json('POST', '/api/user/register', factory(User::class)->make(['phone' => null])->toArray());
        $response->assertStatus(422)->assertJsonStructure(['phone' => []]);

        $response = $this->json('POST', '/api/user/register',
            factory(User::class)->make(['password' => null])->toArray());
        $response->assertStatus(422)->assertJsonStructure(['password' => []]);

        $response = $this->json('POST', '/api/user/register', array_merge(factory(User::class)->make()->toArray(), [
            'password_confirmation' => null,
        ]));
        $response->assertStatus(422)->assertJsonStructure(['password_confirmation' => []]);
    }

    /**
     * @test
     */
    public function guest_cant_register_if_email_is_exists()
    {
        factory(User::class)->create(['email' => 'test@test.com']);

        $response = $this->json('POST', '/api/user/register',
            factory(User::class)->make(['email' => 'test@test.com'])->toArray());
        $response->assertStatus(422)->assertJsonStructure(['email' => []]);
    }

    /**
     * @test
     */
    public function guest_cant_register_if_phone_is_too_long()
    {
        $response = $this->json('POST', '/api/user/register',
            factory(User::class)->make(['phone' => str_random(16)])->toArray());
        $response->assertStatus(422)->assertJsonStructure(['phone' => []]);
    }

    /**
     * @test
     */
    public function guest_cant_register_if_passwords_is_not_equal_or_password_is_too_short()
    {
        $response = $this->json('POST', '/api/user/register', array_merge(
            factory(User::class)->make(['password' => str_random(16)])->toArray(),
            ['password_confirmation' => str_random(16)]
        ));
        $response->assertStatus(422)->assertJsonStructure(['password_confirmation' => []]);

        $response = $this->json('POST', '/api/user/register',
            factory(User::class)->make(['password' => str_random(5)])->toArray());
        $response->assertStatus(422)->assertJsonStructure(['password' => []]);
    }

    /**
     * @test
     */
    public function guest_can_register_if_all_fields_is_present_and_valid()
    {
        $user = factory(User::class)->make(['password' => '123456']);

        $response = $this->json('POST', '/api/user/register', array_merge(
            $user->toArray(),
            [
                'password_confirmation' => '123456',
                'role_driver' => '1',
            ]
        ));

        $response->assertStatus(200);
        $this->assertDatabaseHas(
            'users',
            [
                'email' => $user->email,
                'permissions' => User::DRIVER_PERMISSION,
                'last_name' => $user->last_name,
                'first_name' => $user->first_name,
                'phone' => $user->phone,
                'is_verified' => false,
            ]
        );
    }

    /**
     * @test
     */
    public function user_cant_be_verified_if_not_all_fields_is_present()
    {
        $user = factory(User::class)->create();

        $response = $this->json('POST', '/api/user/verify', []);
        $response->assertStatus(422);

        $response = $this->json('POST', '/api/user/verify', ['email' => $user->email]);
        $response->assertStatus(422)->assertJsonStructure(['token' => []]);

        $response = $this->json('POST', '/api/user/verify', ['token' => '123']);
        $response->assertStatus(422)->assertJsonStructure(['email' => []]);
    }

    /**
     * @test
     */
    public function user_cant_be_verified_if_token_is_not_valid()
    {
        $user = factory(User::class)->create();

        $response = $this->json('POST', '/api/user/verify', ['token' => '1234', 'email' => $user->email]);
        $response->assertStatus(422)->assertJsonStructure(['token' => []]);

        $response = $this->json('POST', '/api/user/verify', ['email' => 'test@test.com', 'token' => $user->verification_token]);
        $response->assertStatus(422);
    }

    /**
     * @test
     */
    public function user_cant_be_verified_if_it_is_already_verified()
    {
        $user = factory(User::class)->create();
        $user->is_verified = true;
        $user->save();

        $response = $this->json('POST', '/api/user/verify', ['token' => $user->verification_token, 'email' => $user->email]);
        $response->assertStatus(422);
    }

    /**
     * @test
     */
    public function user_can_be_verified()
    {
        $user = factory(User::class)->create();

        $response = $this->json('POST', '/api/user/verify', ['token' => $user->verification_token, 'email' => $user->email]);
        $response->assertStatus(200);

        $this->assertDatabaseHas(
            'users',
            [
                'id' => $user->id,
                'is_verified' => true,
            ]
        );
    }
}
