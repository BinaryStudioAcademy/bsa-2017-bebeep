<?php

namespace Tests\Feature\Trips;

use App\User;
use Carbon\Carbon;
use App\Models\Trip;
use Tests\JwtTestCase;

class BaseTripTestCase extends JwtTestCase
{
    /**
     * @param $user
     * @param $data
     *
     * @return \Illuminate\Foundation\Testing\TestResponse
     */
    protected function jsonAsUser($user, $data = [])
    {
        return $this->jsonRequestAsUser($user, $this->method, $this->url, $this->getTripData($data));
    }

    /**
     * Create the driver user.
     *
     * @return \App\User
     */
    protected function getDriverUser(): User
    {
        return factory(User::class)->create(['permissions' => User::DRIVER_PERMISSION]);
    }

    /**
     * Get the basic trip data for testing with the extraData.
     *
     * @param array $extraData
     *
     * @return array
     */
    protected function getTripData($extraData = []): array
    {
        $endAt = Carbon::now()->timestamp;
        $startAt = Carbon::now()->addHour(1)->timestamp;

        return array_merge(factory(Trip::class)->make()->toArray(), [
            'end_at' => $endAt,
            'start_at' => $startAt,
            'routes_time' => [[
                'end_at' => $endAt,
                'start_at' => $startAt,
            ]],
            'from' => json_decode('{"types": ["locality", "political"], "geometry": {"bounds": {"east": 30.825941000000057, "west": 30.239440100000024, "north": 50.590798, "south": 50.213273}, "location": {"lat": 50.4501, "lng": 30.52340000000004}, "viewport": {"east": 30.825941000000057, "west": 30.239440100000024, "north": 50.590798, "south": 50.213273}, "location_type": "APPROXIMATE"}, "place_id": "ChIJBUVa4U7P1EAR_kYBF9IxSXY", "formatted_address": "Киев, Украина, 02000", "address_components": [{"types": ["locality", "political"], "long_name": "Киев", "short_name": "Киев"}, {"types": ["administrative_area_level_2", "political"], "long_name": "город Киев", "short_name": "город Киев"}, {"types": ["country", "political"], "long_name": "Украина", "short_name": "UA"}, {"types": ["postal_code"], "long_name": "02000", "short_name": "02000"}]}'),
            'to' => json_decode('{"types": ["locality", "political"], "geometry": {"bounds": {"east": 36.45581240000001, "west": 36.115837000000056, "north": 50.1053867, "south": 49.883796}, "location": {"lat": 49.9935, "lng": 36.230383000000074}, "viewport": {"east": 36.45581240000001, "west": 36.115837000000056, "north": 50.1053867, "south": 49.883796}, "location_type": "APPROXIMATE"}, "place_id": "ChIJiw-rY5-gJ0ERCr6kGmgYTC0", "formatted_address": "Харьков, Харьковская область, Украина", "address_components": [{"types": ["locality", "political"], "long_name": "Харьков", "short_name": "Харьков"}, {"types": ["administrative_area_level_3", "political"], "long_name": "Харьковский горсовет", "short_name": "Харьковский горсовет"}, {"types": ["administrative_area_level_1", "political"], "long_name": "Харьковская область", "short_name": "Харьковская область"}, {"types": ["country", "political"], "long_name": "Украина", "short_name": "UA"}]}'),
        ], $extraData);
    }

    /**
     * Get the valid trip data for testing.
     *
     * @param int $vehicleId
     *
     * @return array
     */
    protected function getValidTripData($vehicleId): array
    {
        $startAt = $this->setValidTripStartTime();
        $endAt = $this->setValidTripEndTime();

        return array_merge(factory(Trip::class)->make([
            'price' => 350,
            'seats' => 3,
            'vehicle_id' => $vehicleId,
        ])->toArray(), [
            'start_at' => $startAt,
            'end_at' => $endAt,
            'routes_time' => $this->calculateRoutesTime([
                'start_at' => $startAt,
                'end_at' => $endAt,
            ], 1),
            'from' => json_decode('{"types": ["locality", "political"], "geometry": {"bounds": {"east": 30.825941000000057, "west": 30.239440100000024, "north": 50.590798, "south": 50.213273}, "location": {"lat": 50.4501, "lng": 30.52340000000004}, "viewport": {"east": 30.825941000000057, "west": 30.239440100000024, "north": 50.590798, "south": 50.213273}, "location_type": "APPROXIMATE"}, "place_id": "ChIJBUVa4U7P1EAR_kYBF9IxSXY", "formatted_address": "Киев, Украина, 02000", "address_components": [{"types": ["locality", "political"], "long_name": "Киев", "short_name": "Киев"}, {"types": ["administrative_area_level_2", "political"], "long_name": "город Киев", "short_name": "город Киев"}, {"types": ["country", "political"], "long_name": "Украина", "short_name": "UA"}, {"types": ["postal_code"], "long_name": "02000", "short_name": "02000"}]}'),

            'to' => json_decode('{"types": ["locality", "political"], "geometry": {"bounds": {"east": 36.45581240000001, "west": 36.115837000000056, "north": 50.1053867, "south": 49.883796}, "location": {"lat": 49.9935, "lng": 36.230383000000074}, "viewport": {"east": 36.45581240000001, "west": 36.115837000000056, "north": 50.1053867, "south": 49.883796}, "location_type": "APPROXIMATE"}, "place_id": "ChIJiw-rY5-gJ0ERCr6kGmgYTC0", "formatted_address": "Харьков, Харьковская область, Украина", "address_components": [{"types": ["locality", "political"], "long_name": "Харьков", "short_name": "Харьков"}, {"types": ["administrative_area_level_3", "political"], "long_name": "Харьковский горсовет", "short_name": "Харьковский горсовет"}, {"types": ["administrative_area_level_1", "political"], "long_name": "Харьковская область", "short_name": "Харьковская область"}, {"types": ["country", "political"], "long_name": "Украина", "short_name": "UA"}]}'),
        ]);
    }

    /**
     * Set the valid trip start time for testing.
     *
     * @return int
     */
    protected function setValidTripStartTime(): int
    {
        return Carbon::now()->addSeconds(Trip::MIN_DELAY_TO_START_DATE + 60)->timestamp;
    }

    /**
     * Set the valid trip end time for testing.
     *
     * @return int
     */
    protected function setValidTripEndTime(): int
    {
        return Carbon::now()->addSeconds(Trip::MIN_DELAY_TO_START_DATE)->addHour(6)->timestamp;
    }

    /**
     * Calculate the routes start and end time for testing.
     *
     * @param array|Trip $trip
     * @param int $routesCount
     *
     * @return array
     */
    protected function calculateRoutesTime($trip, int $routesCount = 0): array
    {
        if ($trip instanceof Trip) {
            $startAt = $trip->start_at;
            $endAt = $trip->end_at;
        } else {
            ['start_at' => $startAt, 'end_at' => $endAt] = $trip;
        }

        if ($routesCount === 0) {
            $routesCount = $this->getRoutesCountByValidWaypoints();
        } elseif ($routesCount === 1) {
            return [[
                'start_at' => $startAt,
                'end_at' => $endAt,
            ]];
        }

        $routesTime = [];
        $duration = 7200;

        for ($i = 0; $i < $routesCount; $i++) {
            $endRouteTime = $i !== $routesCount - 1
                ? $startAt + $duration
                : $endAt;

            $routesTime[] = [
                'start_at' => $startAt,
                'end_at' => $endRouteTime,
            ];
            $startAt = $endRouteTime;
        }

        return $routesTime;
    }

    /**
     * Get the valid trip waypoints data for testing.
     *
     * @return array
     */
    protected function getValidTripWaypointsData(): array
    {
        return [
            json_decode('{"types": ["locality", "political"], "geometry": {"bounds": {"east": 33.03999190000002, "west": 32.93733789999999, "north": 50.055664, "south": 49.976658}, "location": {"lat": 50.0173168, "lng": 32.99084419999997}, "viewport": {"east": 33.03999190000002, "west": 32.93733789999999, "north": 50.055664, "south": 49.976658}, "location_type": "APPROXIMATE"}, "place_id": "ChIJN5rnOdtd1kARPJ9RdJ00lYw", "formatted_address": "Лубны, Полтавская область, Украина, 37503", "address_components": [{"types": ["locality", "political"], "long_name": "Лубны", "short_name": "Лубны"}, {"types": ["administrative_area_level_3", "political"], "long_name": "Лубенский горсовет", "short_name": "Лубенский горсовет"}, {"types": ["administrative_area_level_1", "political"], "long_name": "Полтавская область", "short_name": "Полтавская область"}, {"types": ["country", "political"], "long_name": "Украина", "short_name": "UA"}, {"types": ["postal_code"], "long_name": "37503", "short_name": "37503"}]}'),

            json_decode('{"types": ["locality", "political"], "geometry": {"bounds": {"east": 34.66827510000007, "west":34.44620199999997, "north":49.6612039, "south":49.542885}, "location": {"lat": 49.58826699999999, "lng": 34.55141690000005}, "viewport": {"east": 34.66827510000007, "west": 34.44620199999997, "north":49.6612039, "south":49.542885}, "location_type": "APPROXIMATE"}, "place_id": "ChIJa7rmJeQl2EARgsrkud9rPs8", "formatted_address": "Полтава, Полтавская область, Украина, 36000", "address_components": [{"types": ["locality", "political"], "long_name": "Полтава", "short_name": "Полтава"}, {"types": ["administrative_area_level_3", "political"], "long_name": "Полтавский горсовет", "short_name": "Полтавский горсовет"}, {"types": ["administrative_area_level_1", "political"], "long_name": "Полтавская область", "short_name": "Полтавская область"}, {"types": ["country", "political"], "long_name": "Украина", "short_name": "UA"}, {"types": ["postal_code"], "long_name": "36000", "short_name": "36000"}]}'),
        ];
    }

    /**
     * Get the routes count by test valid trip waypoints.
     *
     * @return int
     */
    protected function getRoutesCountByValidWaypoints(): int
    {
        return count($this->getValidTripWaypointsData()) + 1;
    }
}
