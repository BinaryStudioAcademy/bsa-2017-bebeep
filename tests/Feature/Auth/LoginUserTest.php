<?php

namespace Tests\Feature\Auth;

use App\User;
use Illuminate\Support\Facades\App;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class LoginUserTest extends TestCase
{
    use DatabaseMigrations, DatabaseTransactions;

    /**
     * @test
     */
    public function guest_cant_auth_if_not_all_required_fields_is_filled()
    {
        $response = $this->json('POST', '/api/user/authorization', []);
        $response->assertStatus(422);

        $response = $this->json('POST', '/api/user/authorization', factory(User::class)->make(['email' => null])->toArray());
        $response->assertStatus(422)->assertJsonStructure(['email' => []]);

        $response = $this->json('POST', '/api/user/authorization',
            factory(User::class)->make(['password' => null])->toArray());
        $response->assertStatus(422)->assertJsonStructure(['password' => []]);

        $response->assertStatus(422)->assertJsonStructure(['password' => []]);
    }

    /**
     * @test
     */
    public function guest_cant_auth_if_password_to_short()
    {
        $response = $this->json('POST', '/api/user/authorization',
            factory(User::class)->make(['password' => str_random(5)])->toArray());
        $response->assertStatus(422)->assertJsonStructure(['password' => []]);
    }

    /**
     * @test
     */
    public function guest_cant_auth_if_he_is_not_registered()
    {
        $response = $this->json('POST', '/api/user/authorization', ['email' => 'example@gmail.com', 'password' => 'secret']);
        $response->assertStatus(404);
    }

    /**
     * @test
     */
    public function guest_can_auth_only_if_he_registered()
    {
        $user = factory(User::class)->create();

        $this->json('POST', '/api/user/authorization', ['email' => $user->email, 'password' => $user->password]);

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'email' => $user->email,
            'password' => $user->password
        ]);
    }

    /**
     * @test
     */
    public function guest_cant_auth_if_he_is_not_verified()
    {
        $user = factory(User::class)->create();
        $user->is_verified = false;
        $user->save();

        $response = $this->json('POST', '/api/user/authorization', ['email' => $user->email, 'password' => $user->password]);
        $response->assertStatus(401);
    }
}
