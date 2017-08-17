<?php

namespace Tests\Feature\Trips;

use App\User;
use Carbon\Carbon;
use App\Models\Vehicle;

class CreateTripTest extends BaseTripTestCase
{
    protected $url;
    protected $method = 'POST';

    public function setUp()
    {
        parent::setUp();

        $this->url = route('trips.create');
    }

    /**
     * @test
     */
    public function guest_cant_create_trip()
    {
        $response = $this->json($this->method, $this->url, []);
        $response->assertStatus(400);
    }

    /**
     * @test
     */
    public function user_can_not_create_trip_if_not_all_fields_is_filled()
    {
        $user = $this->getDriverUser();

        $response = $this->jsonAsUser($user, []);
        $response->assertStatus(422);

        $response = $this->jsonAsUser($user, ['price' => null]);
        $response->assertStatus(422)->assertJsonStructure(['price' => []]);

        $response = $this->jsonAsUser($user, ['start_at' => null]);
        $response->assertStatus(422)->assertJsonStructure(['start_at' => []]);

        $response = $this->jsonAsUser($user, ['end_at' => null]);
        $response->assertStatus(422)->assertJsonStructure(['end_at' => []]);

        $response = $this->jsonAsUser($user, ['vehicle_id' => null]);
        $response->assertStatus(422)->assertJsonStructure(['vehicle_id' => []]);

        $response = $this->jsonAsUser($user, ['from' => null]);
        $response->assertStatus(422)->assertJsonStructure(['from' => []]);

        $response = $this->jsonAsUser($user, ['to' => null]);
        $response->assertStatus(422)->assertJsonStructure(['to' => []]);
    }

    /**
     * @test
     */
    public function user_cant_create_trip_with_not_his_car()
    {
        $user = $this->getDriverUser();
        $user2 = $this->getDriverUser();
        $vehicle = factory(Vehicle::class)->create(['seats' => 4, 'user_id' => $user2->id]);

        $tripData = $this->getValidTripData($vehicle->id);

        $response = $this->jsonRequestAsUser($user, $this->method, $this->url, $tripData);
        $response->assertStatus(422)->assertJsonStructure(['vehicle_id' => []]);
    }

    /**
     * @test
     */
    public function user_can_not_create_trip_with_wrong_time_data()
    {
        $user = $this->getDriverUser();
        $vehicle = factory(Vehicle::class)->create(['seats' => 4, 'user_id' => $user->id]);

        $response = $this->jsonAsUser($user, ['start_at' => str_random(10), 'vehicle_id' => $vehicle->id]);
        $response->assertStatus(422)->assertJsonStructure(['start_at' => []]);

        $response = $this->jsonAsUser($user, ['end_at' => str_random(10), 'vehicle_id' => $vehicle->id]);
        $response->assertStatus(422)->assertJsonStructure(['end_at' => []]);

        $response = $this->jsonAsUser($user,
            ['start_at' => Carbon::now()->subHour(1)->timestamp, 'vehicle_id' => $vehicle->id, 'seats' => 2]);
        $response->assertStatus(422)->assertJsonStructure(['start_at' => []]);

        $response = $this->jsonAsUser($user, [
                'end_at' => Carbon::now()->timestamp,
                'start_at' => Carbon::now()->addHour(1)->timestamp,
                'vehicle_id' => $vehicle->id,
                'seats' => 2,
            ]
        );
        $response->assertStatus(422)->assertJsonStructure(['end_at' => []]);
    }

    /**
     * @test
     */
    public function user_can_not_create_trip_with_wrong_car_data()
    {
        $user = $this->getDriverUser();

        $response = $this->jsonAsUser($user, ['vehicle_id' => 2]);
        $response->assertStatus(422)->assertJsonStructure(['vehicle_id' => []]);

        $vehicle = factory(Vehicle::class)->create(['seats' => 4, 'user_id' => $user->id]);

        $response = $this->jsonAsUser($user, ['seats' => 5, 'vehicle_id' => $vehicle->id]);
        $response->assertStatus(422)->assertJsonStructure(['seats' => []]);

        $response = $this->jsonAsUser($user, ['seats' => -1, 'vehicle_id' => $vehicle->id]);
        $response->assertStatus(422)->assertJsonStructure(['seats' => []]);
    }

    /**
     * @test
     */
    public function user_can_create_trip_if_all_data_is_valid()
    {
        $user = $this->getDriverUser();
        $vehicle = factory(Vehicle::class)->create([
            'seats' => 4,
            'user_id' => $user->id,
        ]);

        $trip = $this->getValidTripData($vehicle->id);

        $response = $this->jsonRequestAsUser($user, $this->method, $this->url, $trip);
        $response->assertStatus(200);

        $this->assertDatabaseHas(
            'trips',
            [
                'price' => (float) $trip['price'],
                'seats' => $trip['seats'],
                'vehicle_id' => $trip['vehicle_id'],
                'user_id' => $user->id,
            ]
        );

        $this->assertDatabaseHas(
            'routes',
            [
                'trip_id' => json_decode($response->getContent())->id,
            ]
        );
    }

    /**
     * @test
     */
    public function user_can_not_create_trip_without_driver_permissions()
    {
        $user = factory(User::class)->create();
        $vehicle = factory(Vehicle::class)->create(['seats' => 4, 'user_id' => $user->id]);

        $tripData = $this->getValidTripData($vehicle->id);

        $response = $this->jsonRequestAsUser($user, $this->method, $this->url, $tripData);
        $response->assertStatus(403);
    }
}
