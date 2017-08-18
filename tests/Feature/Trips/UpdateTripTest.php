<?php

namespace Tests\Feature\Trips;

use App\User;
use Carbon\Carbon;
use App\Models\Trip;
use App\Models\Route;
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
    public function user_cant_edit_trip_if_trip_id_is_not_correct()
    {
        $user = $this->getDriverUser();
        factory(Vehicle::class)->create(['user_id' => $user->id]);
        $trip = factory(Trip::class)->create(['user_id' => $user->id]);

        $this->url = $this->getUrl($trip->id + 1);

        $response = $this->jsonAsUser($user);
        $response->assertStatus(404);

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
     * @test
     */
    public function user_can_edit_trip_successfully()
    {
        $user = $this->getDriverUser();
        $vehicle = factory(Vehicle::class)->create(['seats' => 3, 'user_id' => $user->id]);

        $trip = factory(Trip::class)->create([
            'user_id' => $user->id,
            'vehicle_id' => $vehicle->id,
            'seats' => 3,
            'price' => 200,
        ]);
        $route = factory(Route::class)->create(['trip_id' => $trip->id]);

        $startAt = Carbon::now()->addSeconds(Trip::MIN_DELAY_TO_START_DATE + 60)->timestamp;
        $endAt = Carbon::now()->addSeconds(Trip::MIN_DELAY_TO_START_DATE)->addHour(1)->timestamp;

        $updatedData = array_merge($trip->toArray(), [
            'price' => 500.00,
            'start_at' => $startAt,
            'end_at' => $endAt,
            'from' => ['place' => 'Kiev'],
            'to' => ['place' => 'Lviv'],
        ]);

        $this->url = $this->getUrl($trip->id);

        $response = $this->jsonRequestAsUser($user, $this->method, $this->url, $updatedData);
        $response->assertStatus(200);

        $this->assertDatabaseHas(
            'trips',
            [
                'id' => $trip->id,
                'user_id' => $user->id,
                'vehicle_id' => $vehicle->id,
                'price' => 500,
                'start_at' => Carbon::createFromTimestampUTC($startAt),
                'end_at' => Carbon::createFromTimestampUTC($endAt),
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
