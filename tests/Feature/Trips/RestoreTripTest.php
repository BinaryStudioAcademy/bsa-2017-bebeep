<?php

namespace Tests\Feature\Trips;

use App\User;
use App\Models\Trip;
use App\Models\Vehicle;

class RestoreTripTest extends BaseTripTestCase
{
    protected $url;
    protected $method = 'DELETE';

    /**
     * @test
     */
    public function user_can_not_restore_trip_if_trip_id_is_not_correct()
    {
        $user = $this->getDriverUser();
        $vehicle = factory(Vehicle::class)->create(['user_id' => $user->id]);
        $trip = factory(Trip::class)->create(['user_id' => $user->id, 'vehicle_id' => $vehicle->id]);

        $this->url = $this->getUrl($trip->id + 1);

        $response = $this->jsonAsUser($user);
        $response->assertStatus(404);
    }

    /**
     * @test
     */
    public function user_cant_restore_not_his_trip()
    {
        $user = $this->getDriverUser();
        $user2 = $this->getDriverUser();
        $vehicle = factory(Vehicle::class)->create(['user_id' => $user2->id]);
        $trip = factory(Trip::class)->create(['user_id' => $user2->id, 'vehicle_id' => $vehicle->id]);

        $this->url = $this->getUrl($trip->id);

        $response = $this->jsonAsUser($user);
        $response->assertStatus(422);
    }

    /**
     * @test
     */
    public function user_can_restore_trip()
    {
        $user = $this->getDriverUser();
        $vehicle = factory(Vehicle::class)->create(['user_id' => $user->id]);
        $trip = factory(Trip::class)->create(['user_id' => $user->id, 'vehicle_id' => $vehicle->id]);
        $trip->delete();

        $this->url = $this->getUrl($trip->id);

        $response = $this->jsonAsUser($user);
        $response->assertStatus(200);

        $this->assertDatabaseHas('trips', ['id' => $trip->id, 'deleted_at' => null]);
    }

    /**
     * @test
     */
    public function user_can_not_restore_trip_without_driver_permissions()
    {
        $user = factory(User::class)->create();
        $vehicle = factory(Vehicle::class)->create(['user_id' => $user->id]);
        $trip = factory(Trip::class)->create(['user_id' => $user->id, 'vehicle_id' => $vehicle->id]);

        $this->url = $this->getUrl($trip->id);

        $response = $this->jsonAsUser($user);
        $response->assertStatus(403);
    }

    /**
     * Get url from trips.delete route.
     *
     * @param $id
     * @return string
     */
    private function getUrl($id)
    {
        return route('trips.restore', $id);
    }
}
