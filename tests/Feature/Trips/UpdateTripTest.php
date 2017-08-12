<?php

namespace Tests\Feature\Trips;

use App\Models\Trip;
use App\Models\Vehicle;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class UpdateTripTest extends BaseTripTestCase
{
    use DatabaseMigrations, DatabaseTransactions;

    protected $url;
    protected $method = 'PATCH';

    /**
     * @test
     */
    public function guest_cant_update_trip()
    {
        $user = $this->getDriverUser();
        $this->createValidTrip($user);

        $response = $this->json($this->method, $this->getUrl(1), []);
        $response->assertStatus(400);
    }

    public function user_can_not_update_trip_if_not_all_fields_is_filled()
    {
        $user = $this->getDriverUser();
        $trip = $this->createValidTrip($user);
        $this->url = $this->getUrl($trip->id);

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

    public function user_cant_update_trip_with_not_his_car()
    {
        $user = $this->getDriverUser();
        $user2 = $this->getDriverUser();
        $vehicle = factory(Vehicle::class)->create(['seats' => 4, 'user_id' => $user2->id]);

        $trip = $this->createValidTrip($user);
        $this->url = $this->getUrl($trip->id);

        $tripData = $this->getValidTripData($vehicle->id);

        $response = $this->jsonAsUser($user, $tripData);
        $response->assertStatus(422)->assertJsonStructure(['vehicle_id' => []]);
    }

    /**
     * @test
     * Add a test to check if the user has driver permissions
     */
    public function user_can_not_update_trip_without_driver_permissions()
    {
    }

    /**
     * Get url from trips.update route.
     *
     * @param $id
     * @return string
     */
    private function getUrl($id)
    {
        return route('trips.update', $id);
    }

    /**
     * @param $user
     * @return array
     */
    private function createValidTrip($user)
    {
        factory(Vehicle::class)->create([
            'seats' => 4,
            'user_id' => $user->id,
        ]);

        return factory(Trip::class)->create();
    }
}
