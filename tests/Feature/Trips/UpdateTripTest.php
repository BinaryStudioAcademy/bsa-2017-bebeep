<?php

namespace Tests\Feature\Trips;

use App\User;
use Carbon\Carbon;
use App\Models\Trip;
use App\Models\Route;
use App\Models\Vehicle;

class UpdateTripTest extends BaseTripTestCase
{
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
        $route = factory(Route::class)->create([
            'trip_id' => $trip->id,
        ]);

        $startAt = $this->setValidTripStartTime();
        $endAt = $this->setValidTripEndTime();

        $updatedData = array_merge($trip->toArray(), [
            'is_animals_allowed' => 0,
            'luggage_size' => Trip::LUGGAGE_SIZE_MEDIUM,
            'price' => 500.00,
            'start_at' => $startAt,
            'end_at' => $endAt,
            'routes_time' => $this->calculateRoutesTime([
                'start_at' => $startAt,
                'end_at' => $endAt,
            ], 1),
            'from' => json_decode('{"types": ["locality", "political"], "geometry": {"bounds": {"east": 30.825941000000057, "west": 30.239440100000024, "north": 50.590798, "south": 50.213273}, "location": {"lat": 50.4501, "lng": 30.52340000000004}, "viewport": {"east": 30.825941000000057, "west": 30.239440100000024, "north": 50.590798, "south": 50.213273}, "location_type": "APPROXIMATE"}, "place_id": "ChIJBUVa4U7P1EAR_kYBF9IxSXY", "formatted_address": "Киев, Украина, 02000", "address_components": [{"types": ["locality", "political"], "long_name": "Киев", "short_name": "Киев"}, {"types": ["administrative_area_level_2", "political"], "long_name": "город Киев", "short_name": "город Киев"}, {"types": ["country", "political"], "long_name": "Украина", "short_name": "UA"}, {"types": ["postal_code"], "long_name": "02000", "short_name": "02000"}]}'),
            'to' => json_decode('{"types": ["locality", "political"], "geometry": {"bounds": {"east": 36.45581240000001, "west": 36.115837000000056, "north": 50.1053867, "south": 49.883796}, "location": {"lat": 49.9935, "lng": 36.230383000000074}, "viewport": {"east": 36.45581240000001, "west": 36.115837000000056, "north": 50.1053867, "south": 49.883796}, "location_type": "APPROXIMATE"}, "place_id": "ChIJiw-rY5-gJ0ERCr6kGmgYTC0", "formatted_address": "Харьков, Харьковская область, Украина", "address_components": [{"types": ["locality", "political"], "long_name": "Харьков", "short_name": "Харьков"}, {"types": ["administrative_area_level_3", "political"], "long_name": "Харьковский горсовет", "short_name": "Харьковский горсовет"}, {"types": ["administrative_area_level_1", "political"], "long_name": "Харьковская область", "short_name": "Харьковская область"}, {"types": ["country", "political"], "long_name": "Украина", "short_name": "UA"}]}'),
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
                'is_animals_allowed' => 0,
                'luggage_size' => Trip::LUGGAGE_SIZE_MEDIUM,
            ]
        );
    }

    /**
     * @test
     */
    public function user_can_update_trip_with_multiple_routes()
    {
        $user = $this->getDriverUser();
        $vehicle = factory(Vehicle::class)->create(['seats' => 3, 'user_id' => $user->id]);

        $trip = factory(Trip::class)->create([
            'user_id' => $user->id,
            'vehicle_id' => $vehicle->id,
            'seats' => 3,
            'price' => 200,
        ]);
        factory(Route::class)->create([
            'trip_id' => $trip->id,
        ]);

        $startAt = $this->setValidTripStartTime();
        $endAt = $this->setValidTripEndTime();

        $startAt = Carbon::now()->addSeconds(Trip::MIN_DELAY_TO_START_DATE + 60)->timestamp;
        $endAt = Carbon::now()->addSeconds(Trip::MIN_DELAY_TO_START_DATE)->addHour(1)->timestamp;

        $updatedData = array_merge($trip->toArray(), [
            'price' => 500.00,
            'start_at' => $startAt,
            'end_at' => $endAt,
            'from' => json_decode('{"types": ["locality", "political"], "geometry": {"bounds": {"east": 30.825941000000057, "west": 30.239440100000024, "north": 50.590798, "south": 50.213273}, "location": {"lat": 50.4501, "lng": 30.52340000000004}, "viewport": {"east": 30.825941000000057, "west": 30.239440100000024, "north": 50.590798, "south": 50.213273}, "location_type": "APPROXIMATE"}, "place_id": "ChIJBUVa4U7P1EAR_kYBF9IxSXY", "formatted_address": "Киев, Украина, 02000", "address_components": [{"types": ["locality", "political"], "long_name": "Киев", "short_name": "Киев"}, {"types": ["administrative_area_level_2", "political"], "long_name": "город Киев", "short_name": "город Киев"}, {"types": ["country", "political"], "long_name": "Украина", "short_name": "UA"}, {"types": ["postal_code"], "long_name": "02000", "short_name": "02000"}]}'),

            'to' => json_decode('{"types": ["locality", "political"], "geometry": {"bounds": {"east": 36.45581240000001, "west": 36.115837000000056, "north": 50.1053867, "south": 49.883796}, "location": {"lat": 49.9935, "lng": 36.230383000000074}, "viewport": {"east": 36.45581240000001, "west": 36.115837000000056, "north": 50.1053867, "south": 49.883796}, "location_type": "APPROXIMATE"}, "place_id": "ChIJiw-rY5-gJ0ERCr6kGmgYTC0", "formatted_address": "Харьков, Харьковская область, Украина", "address_components": [{"types": ["locality", "political"], "long_name": "Харьков", "short_name": "Харьков"}, {"types": ["administrative_area_level_3", "political"], "long_name": "Харьковский горсовет", "short_name": "Харьковский горсовет"}, {"types": ["administrative_area_level_1", "political"], "long_name": "Харьковская область", "short_name": "Харьковская область"}, {"types": ["country", "political"], "long_name": "Украина", "short_name": "UA"}]}'),

            'waypoints' => $this->getValidTripWaypointsData(),
            'routes_time' => $this->calculateRoutesTime([
                'start_at' => $startAt,
                'end_at' => $endAt,
            ]),
        ]);

        $this->url = $this->getUrl($trip->id);

        $response = $this->jsonRequestAsUser($user, $this->method, $this->url, $updatedData);
        $response->assertStatus(200);

        $trip = Trip::whereId($trip->id)->with('routes')->first();
        $this->assertCount(3, $trip->routes);
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
