<?php

namespace Tests\Feature\User;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ProfileTest extends TestCase
{
    use DatabaseMigrations, DatabaseTransactions;

    protected $routeShow = ['GET'];
    protected $routeUpdate = ['PUT'];

    public function setUp()
    {
        parent::setUp();

        $this->routeShow[] = route('user.profile.show');
        $this->routeUpdate[] = route('user.profile.update');
    }

    /**
     * @test
     */
    public function guest_cant_show_profile()
    {
        $response = $this->json($this->routeShow[0], $this->routeShow[1]);
        $response->assertStatus(400);
    }

    /**
     * @test
     */
    public function guest_cant_update_profile()
    {
        $response = $this->json($this->routeUpdate[0], $this->routeUpdate[1]);
        $response->assertStatus(400);
    }
}
