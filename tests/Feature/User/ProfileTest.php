<?php

namespace Tests\Feature\User;

use App\User;
use App\Models\Trip;
use Tests\JwtTestCase;
use App\Models\Booking;
use App\Models\Vehicle;

class ProfileTest extends JwtTestCase
{
    /**
     * @var array
     */
    private $routes = [
        'get' => ['GET'],
        'update' => ['PUT'],
    ];

    /**
     * @var array
     */
    private $driverData = [
        'first_name' => 'Alex',
        'last_name' => 'Gartner',
        'email' => 'alex@example.com',
        'phone' => '380501112200',
        'birth_date' => '1984-04-24',
    ];

    /**
     * @var array
     */
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

        $this->routes['get'][] = route('user.profile.show');
        $this->routes['update'][] = route('user.profile.update');
    }

    /**
     * @test
     */
    public function guest_can_not_show_profile()
    {
        $response = $this->jsonRequestFromGuest();
        $response->assertStatus(400);
    }

    /**
     * @test
     */
    public function guest_can_not_update_profile()
    {
        $response = $this->jsonRequestFromGuest('update');
        $response->assertStatus(400);
    }

    /**
     * @test
     */
    public function driver_can_show_profile()
    {
        $user = $this->createDriver($this->driverData);

        $response = $this->jsonRequestUserProfile($user);

        $response->assertStatus(200)
             ->assertExactJson(['data' => $this->driverData + [
                'avatar' => null,
                'about_me' => null,
                'role_driver' => true,
                'role_passenger' => false,
                'can_uncheck_role_driver' => true,
                'can_uncheck_role_passenger' => true,
            ]]);
    }

    /**
     * @test
     */
    public function passenger_can_show_profile()
    {
        $user = $this->createPassenger($this->passengerData);

        $response = $this->jsonRequestUserProfile($user);

        $response->assertStatus(200)
             ->assertExactJson(['data' => $this->passengerData + [
                'avatar' => null,
                'role_driver' => false,
                'role_passenger' => true,
                'can_uncheck_role_driver' => true,
                'can_uncheck_role_passenger' => true,
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

        $response = $this->jsonRequestUserProfile($user);

        $response->assertStatus(200)
             ->assertJson(['data' => [
                'can_uncheck_role_driver' => true,
                'can_uncheck_role_passenger' => true,
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

        $vehicle = $this->createVehicle($user);
        $this->createTrip($user, ['vehicle_id' => $vehicle->id]);

        $response = $this->jsonRequestUserProfile($user);

        $response->assertStatus(200)
             ->assertJson(['data' => [
                'can_uncheck_role_driver' => false,
                'can_uncheck_role_passenger' => true,
            ]]);
    }

    /**
     * @test
     */
    public function user_can_uncheck_role_passenger_in_profile_form()
    {
        $user = $this->createPassenger();

        $response = $this->jsonRequestUserProfile($user);

        $response->assertStatus(200)
             ->assertJson(['data' => [
                'can_uncheck_role_driver' => true,
                'can_uncheck_role_passenger' => true,
            ]]);
    }

    /**
     * @test
     */
    public function user_can_not_uncheck_role_passenger_in_profile_form()
    {
        $user = $this->createPassenger();
        $driver = $this->createDriver();

        $vehicle = $this->createVehicle($driver);
        $trip = $this->createTrip($driver, ['vehicle_id' => $vehicle->id]);
        $this->createBooking($user, ['trip_id' => $trip->id]);

        $response = $this->jsonRequestUserProfile($user);

        $response->assertStatus(200)
             ->assertJson(['data' => [
                'can_uncheck_role_driver' => true,
                'can_uncheck_role_passenger' => false,
            ]]);
    }

    /**
     * @test
     */
    public function user_can_not_update_profile_with_invalid_data()
    {
        $user = $this->createPassenger();
        $userWithExistingEmail = $this->createPassenger([
            'email' => 'is_exists@example.com',
        ]);

        $response = $this->jsonRequestUserProfile($user, 'update', []);
        $response->assertStatus(422);

        // Error - the first_name is required
        $response = $this->jsonRequestUserProfile($user, 'update', [
            'first_name' => null,
        ]);
        $response->assertStatus(422)->assertJsonStructure(['first_name' => []]);

        // Error - the last_name is required
        $response = $this->jsonRequestUserProfile($user, 'update', [
            'last_name' => null,
        ]);
        $response->assertStatus(422)->assertJsonStructure(['last_name' => []]);

        // Error - the email is required
        $response = $this->jsonRequestUserProfile($user, 'update', ['email' => null]);
        $response->assertStatus(422)->assertJsonStructure(['email' => []]);

        // Error - the email is exactly email
        $response = $this->jsonRequestUserProfile($user, 'update', [
            'email' => 'Lorem ipsum dolor.',
        ]);
        $response->assertStatus(422)->assertJsonStructure(['email' => []]);

        // Error - the email is unique
        $response = $this->jsonRequestUserProfile($user, 'update', [
            'email' => $userWithExistingEmail->email,
        ]);
        $response->assertStatus(422)->assertJsonStructure(['email' => []]);

        // Error - the phone is required
        $response = $this->jsonRequestUserProfile($user, 'update', ['phone' => null]);
        $response->assertStatus(422)->assertJsonStructure(['phone' => []]);

        // Error - the phone has the valid format
        $response = $this->jsonRequestUserProfile($user, 'update', [
            'phone' => 'dds1234567',
        ]);
        $response->assertStatus(422)->assertJsonStructure(['phone' => []]);

        // Error - the birth_date has the valid format
        $response = $this->jsonRequestUserProfile($user, 'update', [
            'birth_date' => '1984 dfdf 08 -13',
        ]);
        $response->assertStatus(422)->assertJsonStructure(['birth_date' => []]);

        // Error - the about_me size is longer
        // than the maximum allowed number of characters
        $response = $this->jsonRequestUserProfile($user, 'update', [
            'about_me' => str_random(505),
        ]);
        $response->assertStatus(422)->assertJsonStructure(['about_me' => []]);
    }

    /**
     * @test
     */
    public function user_can_not_update_profile_if_false_driver_with_can_not_uncheck_role_driver()
    {
        $user = $this->createDriver([
            'permissions' => User::DRIVER_PERMISSION + User::PASSENGER_PERMISSION,
        ]);

        $vehicle = $this->createVehicle($user);
        $this->createTrip($user, ['vehicle_id' => $vehicle->id]);

        $response = $this->jsonRequestUserProfile($user, 'update', [
            'role_driver' => false,
        ]);
        $response->assertStatus(422)->assertJsonStructure(['role_driver' => []]);
    }

    /**
     * @test
     */
    public function user_can_not_update_profile_if_false_passenger_with_can_not_uncheck_role_passenger()
    {
        $user = $this->createPassenger();
        $driver = $this->createDriver();

        $vehicle = $this->createVehicle($driver);
        $trip = $this->createTrip($driver, ['vehicle_id' => $vehicle->id]);
        $this->createBooking($user, ['trip_id' => $trip->id]);

        $response = $this->jsonRequestUserProfile($user, 'update', [
            'role_passenger' => false,
        ]);
        $response->assertStatus(422)->assertJsonStructure(['role_passenger' => []]);
    }

    /**
     * @test
     */
    public function user_can_update_profile_successfully()
    {
        $updatedData = [
            'first_name' => 'Alexander',
            'last_name' => 'Gartner',
            'email' => 'alex_new123@example.com',
            'phone' => '380501112200',
            'birth_date' => '1984-04-24',
            'about_me' => 'Lorem ipsum dolor sit amet...',
            'role_driver' => true,
            'role_passenger' => false,
        ];

        $user = $this->createDriver([
            'permissions' => User::DRIVER_PERMISSION + User::PASSENGER_PERMISSION,
        ]);
        $vehicle = $this->createVehicle($user);
        $this->createTrip($user, ['vehicle_id' => $vehicle->id]);

        $response = $this->jsonRequestUserProfile($user, 'update', $updatedData);

        $response->assertStatus(200)
             ->assertExactJson(['data' => $updatedData + [
                'avatar' => null,
                'can_uncheck_role_driver' => false,
                'can_uncheck_role_passenger' => true,
            ]]);
    }

    /**
     * Send request to the user profile from the guest user.
     *
     * @param string $type
     *
     * @return \Illuminate\Foundation\Testing\TestResponse
     */
    private function jsonRequestFromGuest(string $type = 'get')
    {
        return $this->json($this->routes[$type][0], $this->routes[$type][1]);
    }

    /**
     * Send request to the user profile.
     *
     * @param \App\User $user
     * @param string $type
     * @param array $updatedData
     *
     * @return \Illuminate\Foundation\Testing\TestResponse
     */
    private function jsonRequestUserProfile(
        User $user,
        string $type = 'get',
        array $updatedData = []
    ) {
        return $this->jsonRequestAsUser(
            $user,
            $this->routes[$type][0],
            $this->routes[$type][1],
            $updatedData
        );
    }

    /**
     * Create a new driver.
     *
     * @param  array $fields
     *
     * @return \App\User
     */
    private function createDriver(array $fields = []): User
    {
        $fields['permissions'] = $fields['permissions'] ?? User::DRIVER_PERMISSION;

        return factory(User::class)->create($fields);
    }

    /**
     * Create a new passenger.
     *
     * @param  array $fields
     *
     * @return \App\User
     */
    private function createPassenger(array $fields = []): User
    {
        $fields['permissions'] = $fields['permissions'] ?? User::PASSENGER_PERMISSION;

        return factory(User::class)->create($fields);
    }

    /**
     * Create a new vehicle.
     *
     * @param \App\User $user
     *
     * @return \App\Models\Vehicle
     */
    private function createVehicle(User $user): Vehicle
    {
        return factory(Vehicle::class)->create([
            'user_id' => $user->id,
        ]);
    }

    /**
     * Create a new trip.
     *
     * @param \App\User $user
     *
     * @param array $extraData
     * @return Trip
     */
    private function createTrip(User $user, $extraData = []): Trip
    {
        return factory(Trip::class)->create(array_merge([
            'user_id' => $user->id,
        ], $extraData));
    }

    /**
     * Create a new booking.
     *
     * @param \App\User $user
     *
     * @param array $extraData
     * @return Booking
     */
    private function createBooking(User $user, $extraData = []): Booking
    {
        return factory(Booking::class)->create(array_merge([
            'user_id' => $user->id,
        ], $extraData));
    }
}
