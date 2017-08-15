<?php

namespace Tests\Feature\Trips;

use App\User;
use App\Models\Trip;
use App\Models\Vehicle;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class UpdateTripTest extends BaseTripTestCase
{
    use DatabaseMigrations, DatabaseTransactions;

    protected $url;
    protected $method = 'PUT';

    public function setUp()
    {
        parent::setUp();
        $this->url = 'api/trips/1';
    }

    /**
     * @test
     */
    public function guest_cant_edit_trip()
    {
        $response = $this->json($this->method, $this->url, []);
        $response->assertStatus(400);
    }

    /**
     * @test
     */
    public function user_can_not_edit_trip_if_not_all_fields_is_filled()
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
    public function user_cant_edit_trip_if_trip_not_found()
    {
        $user = $this->getDriverUser();
        $vehicle = factory(Vehicle::class)->create(['seats' => 4, 'user_id' => $user->id]);
        $trip = $this->getValidTripData($vehicle->id);
        $this->url = $this->getUrl('9999999999999');

        $response = $this->jsonRequestAsUser($user, $this->method, $this->url, $trip);
        $response->assertStatus(404);
    }

    /**
     * @test
     */
    public function user_cant_edit_trip_without_driver_permissions()
    {
        $user = factory(User::class)->create();
        factory(Vehicle::class)->create(['user_id' => $user->id]);
        $trip = factory(Trip::class)->create(['user_id' => $user->id]);

        $this->url = $this->getUrl($trip->id);

        $response = $this->jsonAsUser($user);
        $response->assertStatus(403);

        $this->assertDatabaseHas(
            'trips',
            [
                'id' => $trip->id,
            ]
        );
    }

    /**
     * @test
     */
    public function user_cant_edit_not_his_trip()
    {
        $user = $this->getDriverUser();
        $user2 = $this->getDriverUser();
        factory(Vehicle::class)->create(['user_id' => $user2->id]);
        $trip = factory(Trip::class)->create(['user_id' => $user2->id]);

        $this->url = $this->getUrl($trip->id);

        $response = $this->jsonAsUser($user);
        $response->assertStatus(401);

        $this->assertDatabaseHas(
            'trips',
            [
                'id' => $trip->id,
            ]
        );
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
}
