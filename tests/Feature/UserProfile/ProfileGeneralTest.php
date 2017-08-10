<?php

namespace Tests\Feature\Auth;

use App\User;
use Tests\JwtTestCase;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ProfileGeneralTest// extends JwtTestCase
{
    use DatabaseMigrations, DatabaseTransactions;

    protected $urlRegister;
    protected $urlVerify;

    public function setUp()
    {
        parent::setUp();
        $this->urlRegister = route('user.register');
        $this->urlVerify = route('user.verify');
    }

    /**
     * @test
     */
    public function guest_cant_register_if_not_all_required_fields_is_filled()
    {
        $response = $this->json('POST', $this->urlRegister, []);
        $response->assertStatus(422);

        $response = $this->json('POST', $this->urlRegister,
            factory(User::class)->make(['first_name' => null])->toArray());
        $response->assertStatus(422)->assertJsonStructure(['first_name' => []]);

        $response = $this->json('POST', $this->urlRegister,
            factory(User::class)->make(['last_name' => null])->toArray());
        $response->assertStatus(422)->assertJsonStructure(['last_name' => []]);

        $response = $this->json('POST', $this->urlRegister, factory(User::class)->make(['email' => null])->toArray());
        $response->assertStatus(422)->assertJsonStructure(['email' => []]);

        $response = $this->json('POST', $this->urlRegister, factory(User::class)->make(['phone' => null])->toArray());
        $response->assertStatus(422)->assertJsonStructure(['phone' => []]);

        $response = $this->json('POST', $this->urlRegister,
            factory(User::class)->make(['password' => null])->toArray());
        $response->assertStatus(422)->assertJsonStructure(['password' => []]);

        $response = $this->json('POST', $this->urlRegister, array_merge(factory(User::class)->make()->toArray(), [
            'password' => 'some_password123',
            'password_confirmation' => null,
        ]));

        $response->assertStatus(422)->assertJsonStructure(['password' => []]);
    }

    /**
     * @test
     */
    public function guest_cant_register_if_email_is_exists()
    {
        factory(User::class)->create(['email' => 'test@test.com']);

        $response = $this->json('POST', $this->urlRegister,
            factory(User::class)->make(['email' => 'test@test.com'])->toArray());
        $response->assertStatus(422)->assertJsonStructure(['email' => []]);
    }

    /**
     * @test
     */
    public function guest_cant_register_if_phone_is_too_long()
    {
        $response = $this->json('POST', $this->urlRegister,
            factory(User::class)->make(['phone' => str_random(16)])->toArray());
        $response->assertStatus(422)->assertJsonStructure(['phone' => []]);
    }

    /**
     * @test
     */
    public function guest_cant_register_if_passwords_is_not_equal_or_password_is_too_short()
    {
        $response = $this->json('POST', $this->urlRegister, array_merge(
            factory(User::class)->make(['password' => str_random(16)])->toArray(),
            ['password_confirmation' => str_random(16)]
        ));
        $response->assertStatus(422)->assertJsonStructure(['password' => []]);

        $response = $this->json('POST', $this->urlRegister,
            factory(User::class)->make(['password' => str_random(5)])->toArray());
        $response->assertStatus(422)->assertJsonStructure(['password' => []]);
    }

    /**
     * @test
     */
    public function guest_can_register_if_all_fields_is_present_and_valid()
    {
        $user = factory(User::class)->make(['password' => '123456']);
        $response = $this->json('POST', $this->urlRegister, array_merge(
            $user->toArray(),
            [
                'password' => '123456',
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

    public function test_user_permissions_is_set_correctly()
    {
        $user = factory(User::class)->make();
        $user2 = factory(User::class)->make();
        $user3 = factory(User::class)->make();
        $user4 = factory(User::class)->make();

        $response = $this->json('POST', $this->urlRegister, array_merge(
            $user->toArray(),
            [
                'password' => '123456',
                'password_confirmation' => '123456',
                'role_driver' => false,
                'role_passenger' => false,
            ]
        ));
        $response->assertStatus(200);
        $this->assertDatabaseHas(
            'users',
            [
                'email' => $user->email,
                'permissions' => User::PASSENGER_PERMISSION,
            ]
        );

        $response = $this->json('POST', $this->urlRegister, array_merge(
            $user2->toArray(),
            [
                'password' => '123456',
                'password_confirmation' => '123456',
                'role_driver' => '1',
            ]
        ));
        $response->assertStatus(200);
        $this->assertDatabaseHas(
            'users',
            [
                'email' => $user2->email,
                'permissions' => User::DRIVER_PERMISSION,
            ]
        );

        $response = $this->json('POST', $this->urlRegister, array_merge(
            $user3->toArray(),
            [
                'password' => '123456',
                'password_confirmation' => '123456',
                'role_passenger' => '1',
            ]
        ));
        $response->assertStatus(200);
        $this->assertDatabaseHas(
            'users',
            [
                'email' => $user3->email,
                'permissions' => User::PASSENGER_PERMISSION,
            ]
        );

        $response = $this->json('POST', $this->urlRegister, array_merge(
            $user4->toArray(),
            [
                'password' => '123456',
                'password_confirmation' => '123456',
                'role_passenger' => '1',
                'role_driver' => '1',
            ]
        ));
        $response->assertStatus(200);
        $this->assertDatabaseHas(
            'users',
            [
                'email' => $user4->email,
                'permissions' => User::PASSENGER_PERMISSION | User::DRIVER_PERMISSION,
            ]
        );
    }

    /**
     * @test
     */
    public function user_cant_be_verified_if_not_all_fields_is_present()
    {
        $user = factory(User::class)->create();

        $response = $this->json('POST', $this->urlVerify, []);
        $response->assertStatus(422);

        $response = $this->json('POST', $this->urlVerify, ['email' => $user->email]);
        $response->assertStatus(422)->assertJsonStructure(['token' => []]);

        $response = $this->json('POST', $this->urlVerify, ['token' => '123']);
        $response->assertStatus(422)->assertJsonStructure(['email' => []]);
    }

    /**
     * @test
     */
    public function user_cant_be_verified_if_token_is_not_valid()
    {
        $user = factory(User::class)->create();

        $response = $this->json('POST', $this->urlVerify, ['token' => '1234', 'email' => $user->email]);
        $response->assertStatus(422)->assertJsonStructure(['token' => []]);

        $response = $this->json('POST', $this->urlVerify, ['email' => 'test@test.com', 'token' => $user->verification_token]);
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

        $response = $this->json('POST', $this->urlVerify, ['token' => $user->verification_token, 'email' => $user->email]);
        $response->assertStatus(422);
    }

    /**
     * @test
     */
    public function user_can_be_verified()
    {
        $user = factory(User::class)->create();

        $response = $this->json('POST', $this->urlVerify, ['token' => $user->verification_token, 'email' => $user->email]);
        $response->assertStatus(200)->assertJsonStructure(['token']);

        $tokenUser = \JWTAuth::toUser($response->json()['token']);
        $this->assertTrue($tokenUser->id === $user->id);

        $this->assertDatabaseHas(
            'users',
            [
                'id' => $user->id,
                'is_verified' => true,
            ]
        );
    }

    /**
     * @test
     */
    public function logged_user_can_not_register_or_verify_account()
    {
        $user = factory(User::class)->create();

        $response = $this->actingAs($user)->json('POST', $this->urlVerify, ['token' => $user->verification_token, 'email' => $user->email]);
        $response->assertStatus(422)->assertJsonStructure(['message']);

        $userData = factory(User::class)->make(['password' => '123456']);
        $response = $this->actingAs($user)->json('POST', $this->urlRegister, array_merge(
            $userData->toArray(),
            [
                'password' => '123456',
                'password_confirmation' => '123456',
                'role_driver' => '1',
            ]
        ));
        $response->assertStatus(422)->assertJsonStructure(['message']);
    }
}
