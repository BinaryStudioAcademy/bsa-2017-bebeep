<?php

namespace Tests\Feature\User;

use App\User;
use App\Models\{
    Trip,
    Vehicle,
    Booking
};
use Tests\JwtTestCase;
use Illuminate\Support\Facades\Artisan;

class ProfileTest extends JwtTestCase
{
    /**
     * @var array
     */
    private $routes = [
        'get' => [ 'GET' ],
        'update' => [ 'PUT' ],
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
        Artisan::call("migrate:refresh");

        $this->routes['get'][] = route('user.profile.show');
        $this->routes['update'][] = route('user.profile.update');
    }

    /**
     * @test
     */
    public function guest_can_not_show_profile()
    {
        $response = $this->json($this->routes['get'][0], $this->routes['get'][1]);
        $response->assertStatus(400);
    }

    /**
     * @test
     */
    public function guest_can_not_update_profile()
    {
        $response = $this->json($this->routes['update'][0], $this->routes['update'][1]);
        $response->assertStatus(400);
    }

    /**
     * @test
     */
    public function driver_can_show_profile()
    {
        $user = $this->createDriver();

        $response = $this->jsonRequestAsUser($user, $this->routes['get'][0], $this->routes['get'][1]);

        $response->assertStatus(200)
             ->assertExactJson(['data' => $this->driverData + [
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
        $user = $this->createPassenger();

        $response = $this->jsonRequestAsUser($user, $this->routes['get'][0], $this->routes['get'][1]);

        $response->assertStatus(200)
             ->assertExactJson(['data' => $this->passengerData + [
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

        $response = $this->jsonRequestAsUser($user, $this->routes['get'][0], $this->routes['get'][1]);

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

        $this->createVehicle($user->id);
        $this->createTrip($user->id);

        $response = $this->jsonRequestAsUser($user, $this->routes['get'][0], $this->routes['get'][1]);

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

        $response = $this->jsonRequestAsUser($user, $this->routes['get'][0], $this->routes['get'][1]);

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

        $this->createVehicle($driver->id);
        $this->createTrip($driver->id);
        $this->createBooking($user->id);

        $response = $this->jsonRequestAsUser($user, $this->routes['get'][0], $this->routes['get'][1]);

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

        $response = $this->jsonUpdateUser($user, []);
        $response->assertStatus(422);

        // Error - the first_name is required
        $response = $this->jsonUpdateUser($user, ['first_name' => null]);
        $response->assertStatus(422)->assertJsonStructure(['first_name' => []]);

        // Error - the last_name is required
        $response = $this->jsonUpdateUser($user, ['last_name' => null]);
        $response->assertStatus(422)->assertJsonStructure(['last_name' => []]);

        // Error - the email is required
        $response = $this->jsonUpdateUser($user, ['email' => null]);
        $response->assertStatus(422)->assertJsonStructure(['email' => []]);

        // Error - the email is exactly email
        $response = $this->jsonUpdateUser($user, ['email' => 'Lorem ipsum dolor.']);
        $response->assertStatus(422)->assertJsonStructure(['email' => []]);

        // Error - the email is unique
        $response = $this->jsonUpdateUser($user, ['email' => $userWithExistingEmail->email]);
        $response->assertStatus(422)->assertJsonStructure(['email' => []]);

        // Error - the phone is required
        $response = $this->jsonUpdateUser($user, ['phone' => null]);
        $response->assertStatus(422)->assertJsonStructure(['phone' => []]);

        // Error - the phone has the valid format
        $response = $this->jsonUpdateUser($user, ['phone' => 'dds1234567']);
        $response->assertStatus(422)->assertJsonStructure(['phone' => []]);

        // Error - the birth_date has the valid format
        $response = $this->jsonUpdateUser($user, ['birth_date' => '1984 dfdf 08 -13']);
        $response->assertStatus(422)->assertJsonStructure(['birth_date' => []]);

        // Error - the about_me size is longer
        // than the maximum allowed number of characters
        $response = $this->jsonUpdateUser($user, ['about_me' => str_random(505)]);
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

        $this->createVehicle($user->id);
        $this->createTrip($user->id);

        $response = $this->jsonUpdateUser($user, ['role_driver' => false]);
        $response->assertStatus(422)->assertJsonStructure(['role_driver' => []]);
    }

    /**
     * @test
     */
    public function user_can_not_update_profile_if_false_passenger_with_can_not_uncheck_role_passenger()
    {
        $user = $this->createPassenger();
        $driver = $this->createDriver();

        $this->createVehicle($driver->id);
        $this->createTrip($driver->id);
        $this->createBooking($user->id);

        $response = $this->jsonUpdateUser($user, ['role_passenger' => false]);
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
        $this->createVehicle($user->id);
        $this->createTrip($user->id);

        $response = $this->jsonUpdateUser($user, $updatedData);

        $response->assertStatus(200)
             ->assertExactJson(['data' => $updatedData + [
                'can_uncheck_role_driver' => false,
                'can_uncheck_role_passenger' => true,
            ]]);
    }

    /**
     * Send request on the user profile update.
     *
     * @param \App\User $user
     * @param array $updatedData
     *
     * @return \Illuminate\Foundation\Testing\TestResponse
     */
    private function jsonUpdateUser(User $user, array $updatedData = [])
    {
        return $this->jsonRequestAsUser(
            $user,
            $this->routes['update'][0],
            $this->routes['update'][1],
            $updatedData
        );
    }

    /**
     * Create a new driver.
     *
     * @param  array $fields
     * @return \App\User
     */
    private function createDriver(array $fields = []): User
    {
        $fields['permissions'] = $fields['permissions'] ?? User::DRIVER_PERMISSION;

        return factory(User::class)->create(array_merge($this->driverData, $fields));
    }

    /**
     * Create a new passenger.
     *
     * @param  array $fields
     * @return \App\User
     */
    private function createPassenger(array $fields = []): User
    {
        $fields['permissions'] = $fields['permissions'] ?? User::PASSENGER_PERMISSION;

        return factory(User::class)->create(array_merge($this->passengerData, $fields));
    }

    /**
     * Create a new vehicle.
     *
     * @param  int $userId
     * @return \App\Models\Vehicle
     */
    private function createVehicle(int $userId): Vehicle
    {
        return factory(Vehicle::class)->create([
            'user_id' => $userId,
        ]);
    }

    /**
     * Create a new trip.
     *
     * @param  int $userId
     * @return \App\Models\Trip
     */
    private function createTrip(int $userId): Trip
    {
        return factory(Trip::class)->create([
            'user_id' => $userId,
        ]);
    }

    /**
     * Create a new booking.
     *
     * @param  int $userId
     * @return \App\Models\Booking
     */
    private function createBooking(int $userId): Booking
    {
        return factory(Booking::class)->create([
            'user_id' => $userId,
        ]);
    }
}
