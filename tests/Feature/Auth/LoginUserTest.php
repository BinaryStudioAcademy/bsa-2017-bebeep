<?php

namespace Tests\Feature\Auth;

use App\User;
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
        $response = $this->json('POST', '/api/user/authenticate', []);
        $response->assertStatus(422);

        $response = $this->json('POST', '/api/user/authenticate', factory(User::class)->make(['email' => null])->toArray());
        $response->assertStatus(422)->assertJsonStructure(['email' => []]);

        $response = $this->json('POST', '/api/user/authenticate',
            factory(User::class)->make(['password' => null])->toArray());
        $response->assertStatus(422)->assertJsonStructure(['password' => []]);

        $response->assertStatus(422)->assertJsonStructure(['password' => []]);
    }
}
