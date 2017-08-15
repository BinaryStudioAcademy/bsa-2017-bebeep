<?php

namespace Tests\Feature\User;

use App\User;
use Tests\JwtTestCase;

class UpdatePasswordTest extends JwtTestCase
{
    /**
     * @var array
     */
    private $routeUpdate = ['PATCH'];

    public function setUp()
    {
        parent::setUp();

        $this->routeUpdate[] = route('user.profile.password.update');
    }

    /**
     * @test
     */
    public function guest_can_not_update_password()
    {
        $response = $this->json($this->routeUpdate[0], $this->routeUpdate[1]);
        $response->assertStatus(400);
    }
}
