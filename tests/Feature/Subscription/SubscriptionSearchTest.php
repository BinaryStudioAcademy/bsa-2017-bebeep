<?php

namespace Tests\Feature\Subscription;

use App\Services\Helpers\Subscriptions\Filters\Enum\FilterAnimalsEnum;
use App\User;
use Carbon\Carbon;
use App\Models\Trip;
use App\Models\Route;
use App\Models\Filter;
use Tests\JwtTestCase;
use App\Models\Vehicle;
use App\Models\Subscription;
use App\Services\Contracts\SubscriptionsService;

class SubscriptionSearchTest extends JwtTestCase
{
    private $locations;

    public function setUp()
    {
        parent::setUp();

        $this->locations = [
            [
                'from' => json_decode('{"types": ["locality", "political"], "geometry": {"bounds": {"east": 30.825941000000057, "west": 30.239440100000024, "north": 50.590798, "south": 50.213273}, "location": {"lat": 50.4501, "lng": 30.52340000000004}, "viewport": {"east": 30.825941000000057, "west": 30.239440100000024, "north": 50.590798, "south": 50.213273}, "location_type": "APPROXIMATE"}, "place_id": "ChIJBUVa4U7P1EAR_kYBF9IxSXY", "formatted_address": "Киев, Украина, 02000", "address_components": [{"types": ["locality", "political"], "long_name": "Киев", "short_name": "Киев"}, {"types": ["administrative_area_level_2", "political"], "long_name": "город Киев", "short_name": "город Киев"}, {"types": ["country", "political"], "long_name": "Украина", "short_name": "UA"}, {"types": ["postal_code"], "long_name": "02000", "short_name": "02000"}]}'),
                'from_lat' => 50.45010000,
                'from_lng' => 30.52340000,
                'to' => json_decode('{"types": ["locality", "political"], "geometry": {"bounds": {"east": 36.45581240000001, "west": 36.115837000000056, "north": 50.1053867, "south": 49.883796}, "location": {"lat": 49.9935, "lng": 36.230383000000074}, "viewport": {"east": 36.45581240000001, "west": 36.115837000000056, "north": 50.1053867, "south": 49.883796}, "location_type": "APPROXIMATE"}, "place_id": "ChIJiw-rY5-gJ0ERCr6kGmgYTC0", "formatted_address": "Харьков, Харьковская область, Украина", "address_components": [{"types": ["locality", "political"], "long_name": "Харьков", "short_name": "Харьков"}, {"types": ["administrative_area_level_3", "political"], "long_name": "Харьковский горсовет", "short_name": "Харьковский горсовет"}, {"types": ["administrative_area_level_1", "political"], "long_name": "Харьковская область", "short_name": "Харьковская область"}, {"types": ["country", "political"], "long_name": "Украина", "short_name": "UA"}]}'),
                'to_lat' => 49.99350000,
                'to_lng' => 36.23038300,
            ], [
                'from' => json_decode('{"types": ["locality", "political"], "geometry": {"bounds": {"east": 28.75686010000004, "west": 28.590574999999944, "north": 50.3118629, "south": 50.22391}, "location": {"lat": 50.25465, "lng": 28.65866690000007}, "viewport": {"east": 28.75686010000004, "west": 28.590574999999944, "north": 50.3118629, "south": 50.22391}, "location_type": "APPROXIMATE"}, "place_id": "ChIJXTX6K6NkLEcRKeK52aPSSvE", "formatted_address": "Житомир, Житомирская область, Украина, 10001", "address_components": [{"types": ["locality", "political"], "long_name": "Житомир", "short_name": "Житомир"}, {"types": ["administrative_area_level_3", "political"], "long_name": "Житомирский горсовет", "short_name": "Житомирский горсовет"}, {"types": ["administrative_area_level_1", "political"], "long_name": "Житомирская область", "short_name": "Житомирская область"}, {"types": ["country", "political"], "long_name": "Украина", "short_name": "UA"}, {"types": ["postal_code"], "long_name": "10001", "short_name": "10001"}]}'),
                'from_lat' => 50.25465000,
                'from_lng' => 28.65866690,
                'to' => json_decode('{"types": ["locality", "political"], "geometry": {"bounds": {"east": 30.825941000000057, "west": 30.239440100000024, "north": 50.590798, "south": 50.213273}, "location": {"lat": 50.4501, "lng": 30.52340000000004}, "viewport": {"east": 30.825941000000057, "west": 30.239440100000024, "north": 50.590798, "south": 50.213273}, "location_type": "APPROXIMATE"}, "place_id": "ChIJBUVa4U7P1EAR_kYBF9IxSXY", "formatted_address": "Киев, Украина, 02000", "address_components": [{"types": ["locality", "political"], "long_name": "Киев", "short_name": "Киев"}, {"types": ["administrative_area_level_2", "political"], "long_name": "город Киев", "short_name": "город Киев"}, {"types": ["country", "political"], "long_name": "Украина", "short_name": "UA"}, {"types": ["postal_code"], "long_name": "02000", "short_name": "02000"}]}'),
                'to_lat' => 50.45010000,
                'to_lng' => 30.52340000,
            ], [
                'from' => json_decode('{"types": ["locality", "political"], "geometry": {"bounds": {"east": 36.45581240000001, "west": 36.115837000000056, "north": 50.1053867, "south": 49.883796}, "location": {"lat": 49.9935, "lng": 36.230383000000074}, "viewport": {"east": 36.45581240000001, "west": 36.115837000000056, "north": 50.1053867, "south": 49.883796}, "location_type": "APPROXIMATE"}, "place_id": "ChIJiw-rY5-gJ0ERCr6kGmgYTC0", "formatted_address": "Харьков, Харьковская область, Украина", "address_components": [{"types": ["locality", "political"], "long_name": "Харьков", "short_name": "Харьков"}, {"types": ["administrative_area_level_3", "political"], "long_name": "Харьковский горсовет", "short_name": "Харьковский горсовет"}, {"types": ["administrative_area_level_1", "political"], "long_name": "Харьковская область", "short_name": "Харьковская область"}, {"types": ["country", "political"], "long_name": "Украина", "short_name": "UA"}]}'),
                'from_lat' => 49.99350000,
                'from_lng' => 36.23038300,
                'to' => json_decode('{"types": ["locality", "political"], "geometry": {"bounds": {"east": 28.75686010000004, "west": 28.590574999999944, "north": 50.3118629, "south": 50.22391}, "location": {"lat": 50.25465, "lng": 28.65866690000007}, "viewport": {"east": 28.75686010000004, "west": 28.590574999999944, "north": 50.3118629, "south": 50.22391}, "location_type": "APPROXIMATE"}, "place_id": "ChIJXTX6K6NkLEcRKeK52aPSSvE", "formatted_address": "Житомир, Житомирская область, Украина, 10001", "address_components": [{"types": ["locality", "political"], "long_name": "Житомир", "short_name": "Житомир"}, {"types": ["administrative_area_level_3", "political"], "long_name": "Житомирский горсовет", "short_name": "Житомирский горсовет"}, {"types": ["administrative_area_level_1", "political"], "long_name": "Житомирская область", "short_name": "Житомирская область"}, {"types": ["country", "political"], "long_name": "Украина", "short_name": "UA"}, {"types": ["postal_code"], "long_name": "10001", "short_name": "10001"}]}'),
                'to_lat' => 50.25465000,
                'to_lng' => 28.65866690,
            ], [
                'from' => json_decode('{"types": ["locality", "political"], "geometry": {"bounds": {"east": 34.66827510000007, "west": 34.44620199999997, "north": 49.6612039, "south": 49.542885}, "location": {"lat": 49.58826699999999, "lng": 34.55141690000005}, "viewport": {"east": 34.66827510000007, "west": 34.44620199999997, "north": 49.6612039, "south": 49.542885}, "location_type": "APPROXIMATE"}, "place_id": "ChIJa7rmJeQl2EARgsrkud9rPs8", "formatted_address": "Полтава, Полтавская область, Украина, 36000", "address_components": [{"types": ["locality", "political"], "long_name": "Полтава", "short_name": "Полтава"}, {"types": ["administrative_area_level_3", "political"], "long_name": "Полтавский горсовет", "short_name": "Полтавский горсовет"}, {"types": ["administrative_area_level_1", "political"], "long_name": "Полтавская область", "short_name": "Полтавская область"}, {"types": ["country", "political"], "long_name": "Украина", "short_name": "UA"}, {"types": ["postal_code"], "long_name": "36000", "short_name": "36000"}]}'),
                'from_lat' => 49.58826700,
                'from_lng' => 34.55141690,
                'to' => json_decode('{"types": ["locality", "political"], "geometry": {"bounds": {"east": 28.75686010000004, "west": 28.590574999999944, "north": 50.3118629, "south": 50.22391}, "location": {"lat": 50.25465, "lng": 28.65866690000007}, "viewport": {"east": 28.75686010000004, "west": 28.590574999999944, "north": 50.3118629, "south": 50.22391}, "location_type": "APPROXIMATE"}, "place_id": "ChIJXTX6K6NkLEcRKeK52aPSSvE", "formatted_address": "Житомир, Житомирская область, Украина, 10001", "address_components": [{"types": ["locality", "political"], "long_name": "Житомир", "short_name": "Житомир"}, {"types": ["administrative_area_level_3", "political"], "long_name": "Житомирский горсовет", "short_name": "Житомирский горсовет"}, {"types": ["administrative_area_level_1", "political"], "long_name": "Житомирская область", "short_name": "Житомирская область"}, {"types": ["country", "political"], "long_name": "Украина", "short_name": "UA"}, {"types": ["postal_code"], "long_name": "10001", "short_name": "10001"}]}'),
                'to_lat' => 50.25465000,
                'to_lng' => 28.65866690,
            ],
        ];
    }

    /**
     * @test
     */
    public function it_find_trip()
    {
        $this->getSubscription($this->locations[0]);
        $subscription = $this->getSubscription($this->locations[1]);

        $trip = $this->getTrip([
                'from' => $subscription->from,
                'lat' => $subscription->from_lat,
                'lng' => $subscription->from_lng,
            ], [
                'to' => $subscription->to,
                'lat' => $subscription->to_lat,
                'lng' => $subscription->to_lng,
            ],
            ['start_at' => $subscription->start_at]
        );

        $service = app()->make(SubscriptionsService::class);

        $found = $service->getSubscriptionsByTrip($trip);

        $this->assertCount(1, $found);
        $first = $found->first();
        $this->assertInstanceOf(Subscription::class, $first);
        $this->assertEquals($subscription->id, $first->id);
    }

    /**
     * @test
     */
    public function it_find_trip_with_time_filter()
    {
        $start_at = Carbon::today();
        $subscription = $this->getSubscription(array_merge($this->locations[0], [
            'start_at' => $start_at,
        ]));

        $subscription2 = $this->getSubscription(array_merge($this->locations[0], [
            'start_at' => $start_at,
        ]));

        $start_at->addHours(8);
        $trip = $this->getTrip([
                'from' => $subscription->from,
                'lat' => $subscription->from_lat,
                'lng' => $subscription->from_lng,
            ], [
                'to' => $subscription->to,
                'lat' => $subscription->to_lat,
                'lng' => $subscription->to_lng,
            ],
            ['start_at' => $start_at]
        );

        $filter = $this->getFilter($subscription, [
            'name' => 'time',
            'parameters' => ['from' => 6, 'to' => 10],
        ]);

        $filter2 = $this->getFilter($subscription2, [
            'name' => 'time',
            'parameters' => ['from' => 11, 'to' => 14],
        ]);

        $service = app()->make(SubscriptionsService::class);

        $found = $service->getSubscriptionsByTrip($trip);

        $this->assertCount(1, $found);
        $first = $found->first();
        $this->assertInstanceOf(Subscription::class, $first);
        $this->assertEquals($subscription->id, $first->id);
    }

    /**
     * @test
     */
    public function it_find_trip_with_animals_filter()
    {
        $start_at = Carbon::today();
        $subscription = $this->getSubscription(array_merge($this->locations[0], [
            'start_at' => $start_at,
        ]));

        $subscription2 = $this->getSubscription(array_merge($this->locations[0], [
            'start_at' => $start_at,
        ]));

        $start_at->addHours(8);
        $tripWithAnimals = $this->getTrip([
                'from' => $subscription->from,
                'lat' => $subscription->from_lat,
                'lng' => $subscription->from_lng,
            ], [
                'to' => $subscription->to,
                'lat' => $subscription->to_lat,
                'lng' => $subscription->to_lng,
            ],
            ['is_animals_allowed' => true]
        );
        $tripWithoutAnimals = $this->getTrip([
            'from' => $subscription->from,
            'lat' => $subscription->from_lat,
            'lng' => $subscription->from_lng,
        ], [
            'to' => $subscription->to,
            'lat' => $subscription->to_lat,
            'lng' => $subscription->to_lng,
        ],
            ['is_animals_allowed' => false]
        );

        $filter = $this->getFilter($subscription, [
            'name' => 'animals',
            'parameters' => ['value' => FilterAnimalsEnum::ALLOWED],
        ]);

        $filter2 = $this->getFilter($subscription2, [
            'name' => 'animals',
            'parameters' => ['value' => FilterAnimalsEnum::DISALLOWED],
        ]);

        $service = app()->make(SubscriptionsService::class);

        $found1 = $service->getSubscriptionsByTrip($tripWithAnimals);

        $this->assertCount(1, $found1);
        $first = $found1->first();
        $this->assertInstanceOf(Subscription::class, $first);
        $this->assertEquals($subscription->id, $first->id);

        $found2 = $service->getSubscriptionsByTrip($tripWithoutAnimals);

        $this->assertCount(1, $found2);
        $first = $found2->first();
        $this->assertInstanceOf(Subscription::class, $first);
        $this->assertEquals($subscription2->id, $first->id);

    }

    /**
     * @param $from
     * @param $to
     * @param $start_at
     * @return Trip
     */
    public function getTrip($from, $to, array $params = []): Trip
    {
        $user = factory(User::class)->create();
        $vehicle = factory(Vehicle::class)->create(['user_id' => $user->id]);
        $trip = factory(Trip::class)->create(array_merge([
            'user_id' => $user->id,
            'vehicle_id' => $vehicle->id,
        ], $params));

        $route = factory(Route::class)->create([
            'trip_id' => $trip->id,
            'from' => $from['from'],
            'from_lat' => $from['lat'],
            'from_lng' => $from['lng'],
            'to' => $to['to'],
            'to_lat' => $to['lat'],
            'to_lng' => $to['lng'],
        ]);

        return $trip;
    }

    /**
     * @return Subscription
     */
    public function getSubscription(array $params = []): Subscription
    {
        return factory(Subscription::class)->create($params);
    }

    /**
     * @param Subscription $subscription
     */
    public function getFilter(Subscription $subscription, array $params) : Filter
    {
        return factory(Filter::class)->create(array_merge(
            ['subscription_id' => $subscription->id],
            $params
        ));
    }
}
