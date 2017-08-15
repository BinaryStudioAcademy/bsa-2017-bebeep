<?php

namespace Tests\Feature\User;

use App\User;
use App\Models\Trip;
use App\Models\Vehicle;
use App\Models\Booking;
use Tests\JwtTestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ProfileTest extends JwtTestCase
{
    use DatabaseMigrations, DatabaseTransactions;

    protected $routeShow = ['GET'];
    protected $routeUpdate = ['PUT'];

    protected $passengerData = [
        'first_name' => 'Bill',
        'last_name' => 'King',
        'email' => 'bking@gmail.com',
        'phone' => '380955556633',
        'birth_date' => '1975-08-15',
        'about_me' => 'Lorem ipsum dolor sit amet.',
    ];

    protected $driverData = [
        'first_name' => 'Alex',
        'last_name' => 'Gartner',
        'email' => 'alex@example.com',
        'phone' => '380501112200',
        'birth_date' => '1984-04-24',
    ];

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

    /**
     * @test
     */
    public function passenger_can_show_profile()
    {
        $user = $this->createPassenger();

        $response = $this->jsonRequestAsUser($user, $this->routeShow[0], $this->routeShow[1]);

        $response->assertStatus(200)
             ->assertExactJson(['data' => $this->passengerData + [
                'role_driver' => false,
                'role_passenger' => true,
                'can_uncheck_driver' => true,
                'can_uncheck_passenger' => true,
            ]]);
    }

    /**
     * @test
     */
    public function driver_can_show_profile()
    {
        $user = $this->createDriver();

        $response = $this->jsonRequestAsUser($user, $this->routeShow[0], $this->routeShow[1]);

        $response->assertStatus(200)
             ->assertExactJson(['data' => $this->driverData + [
                'about_me' => null,
                'role_driver' => true,
                'role_passenger' => false,
                'can_uncheck_driver' => true,
                'can_uncheck_passenger' => true,
            ]]);
    }

    private function createPassenger(): User
    {
        return factory(User::class)->create($this->passengerData + [
            'permissions' => User::PASSENGER_PERMISSION,
        ]);
    }

    private function createDriver(): User
    {
        return factory(User::class)->create($this->driverData + [
            'permissions' => User::DRIVER_PERMISSION,
        ]);
    }
}
