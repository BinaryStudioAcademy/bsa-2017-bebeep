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

    private $routeShow = ['GET'];
    private $routeUpdate = ['PUT'];

    private $driverData = [
        'first_name' => 'Alex',
        'last_name' => 'Gartner',
        'email' => 'alex@example.com',
        'phone' => '380501112200',
        'birth_date' => '1984-04-24',
    ];

    private $passengerData = [
        'first_name' => 'Bill',
        'last_name' => 'King',
        'email' => 'bking@gmail.com',
        'phone' => '380955556633',
        'birth_date' => '1975-08-15',
        'about_me' => 'Lorem ipsum dolor sit amet.',
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
    public function guest_can_not_show_profile()
    {
        $response = $this->json($this->routeShow[0], $this->routeShow[1]);
        $response->assertStatus(400);
    }

    /**
     * @test
     */
    public function guest_can_not_update_profile()
    {
        $response = $this->json($this->routeUpdate[0], $this->routeUpdate[1]);
        $response->assertStatus(400);
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
    public function user_can_uncheck_role_driver_in_profile_form()
    {
        $user = $this->createDriver([
            'permissions' => User::DRIVER_PERMISSION + User::PASSENGER_PERMISSION,
        ]);

        $response = $this->jsonRequestAsUser($user, $this->routeShow[0], $this->routeShow[1]);

        $response->assertStatus(200)
             ->assertJson(['data' => [
                'can_uncheck_driver' => true,
                'can_uncheck_passenger' => true,
            ]]);
    }

    /**
     * @test
     */
    public function user_can_not_uncheck_role_driver_in_profile_form()
    {
        $user = $this->createDriver([
            'permissions' => User::DRIVER_PERMISSION + User::PASSENGER_PERMISSION,
        ]);

        $this->createVehicle();
        $this->createTrip();

        $response = $this->jsonRequestAsUser($user, $this->routeShow[0], $this->routeShow[1]);

        $response->assertStatus(200)
             ->assertJson(['data' => [
                'can_uncheck_driver' => false,
                'can_uncheck_passenger' => true,
            ]]);
    }

    /**
     * @test
     */
    public function user_can_uncheck_role_passenger_in_profile_form()
    {
        $user = $this->createPassenger();

        $response = $this->jsonRequestAsUser($user, $this->routeShow[0], $this->routeShow[1]);

        $response->assertStatus(200)
             ->assertJson(['data' => [
                'can_uncheck_driver' => true,
                'can_uncheck_passenger' => true,
            ]]);
    }

    /**
     * @test
     */
    public function user_can_not_uncheck_role_passenger_in_profile_form()
    {
        $user = $this->createPassenger();

        $driver = $this->createDriver();
        $this->createVehicle($driver->id);
        $this->createTrip($driver->id);
        $this->createBooking($user->id);

        $response = $this->jsonRequestAsUser($user, $this->routeShow[0], $this->routeShow[1]);

        $response->assertStatus(200)
             ->assertJson(['data' => [
                'can_uncheck_driver' => true,
                'can_uncheck_passenger' => false,
            ]]);
    }

    private function createDriver(array $params = []): User
    {
        return factory(User::class)->create($this->driverData + [
            'id' => 1,
            'permissions' => $params['permissions'] ?? User::DRIVER_PERMISSION,
        ]);
    }

    private function createPassenger(array $params = []): User
    {
        return factory(User::class)->create($this->passengerData + [
            'id' => 2,
            'permissions' => $params['permissions'] ?? User::PASSENGER_PERMISSION,
        ]);
    }

    private function createVehicle(): Vehicle
    {
        return factory(Vehicle::class)->create([
            'user_id' => 1,
        ]);
    }

    private function createTrip(): Trip
    {
        return factory(Trip::class)->create([
            'user_id' => 1,
        ]);
    }

    private function createBooking(): Booking
    {
        return factory(Booking::class)->create([
            'user_id' => 2,
        ]);
    }
}
