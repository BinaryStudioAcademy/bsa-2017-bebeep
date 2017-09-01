<?php

namespace Tests\Feature\User;

use App\User;
use Tests\TestCase;
use App\Models\Vehicle;
//use Illuminate\Support\Facades\Artisan;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class PublicProfileTest extends TestCase
{
    use DatabaseMigrations;

    /*public function setUp()
    {
        parent::setUp();
        Artisan::call('migrate:refresh');
    }*/

    /**
     * @test
     */
    public function can_not_show_profile_if_driver_not_exist()
    {
        $user = $this->createDriver();
        $user->id = 100;

        $response = $this->jsonGetProfile($user, 'driver');
        $response->assertStatus(404);
    }

    /**
     * @test
     */
    public function can_not_show_profile_if_passenger_not_exist()
    {
        $user = $this->createPassenger();
        $user->id = 100;

        $response = $this->jsonGetProfile($user, 'passenger');
        $response->assertStatus(404);
    }

    /**
     * @test
     */
    public function can_not_show_profile_if_user_not_driver()
    {
        $user = $this->createPassenger();

        $response = $this->jsonGetProfile($user, 'driver');
        $response->assertStatus(422);
    }

    /**
     * @test
     */
    public function can_not_show_profile_if_user_not_passenger()
    {
        $user = $this->createDriver();

        $response = $this->jsonGetProfile($user, 'passenger');
        $response->assertStatus(422);
    }

    /**
     * @test
     */
    public function can_show_driver_profile()
    {
        $user = $this->createDriver();
        $this->createVehicle($user);

        $response = $this->jsonGetProfile($user, 'driver');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'first_name',
                    'last_name',
                    'birth_date',
                    'about_me',
                    'photo',
                    'vehicle' => [
                        'data' => [
                            'brand',
                            'model',
                            'color',
                            'photo',
                        ]
                    ],
                    'trips_count',
                    'email_is_verified',
                    'created_at',
                ]
            ]);
    }

    /**
     * @test
     */
    public function can_show_passenger_profile()
    {
        $user = $this->createPassenger();

        $response = $this->jsonGetProfile($user, 'passenger');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'first_name',
                    'last_name',
                    'birth_date',
                    'about_me',
                    'photo',
                    'trips_count',
                    'email_is_verified',
                    'created_at',
                ]
            ]);
    }

    /**
     * Send request on the user public profile.
     *
     * @param \App\User $user
     * @param string $type  'driver'|'passenger'
     *
     * @return \Illuminate\Foundation\Testing\TestResponse
     */
    private function jsonGetProfile(User $user, string $type)
    {
        $method = 'GET';
        $request = route("{$type}.profile", ['id' => $user->id]);

        return $this->json($method, $request);
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
        $fields['permissions'] = User::DRIVER_PERMISSION;

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
        $fields['permissions'] = User::PASSENGER_PERMISSION;

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
}
