<?php

namespace Tests\Feature\Trips;

use Carbon\Carbon;
use App\Models\Vehicle;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class SearchTripsTest extends BaseTripTestCase
{
    use DatabaseTransactions;

    const ENDPOINT = '/api/v1/trips/search';

    protected $method = 'POST';

    public $responseNoExistData = [
        'data' => []
    ];

    public $userId;
    public $trip;


    /**
     * Test to find the right data
     */
    public function test_search_exist_data()
    {
        $response = $this->create_trip();

        $response->assertStatus(200);

        $this->assertDatabaseHas(
            'trips',
            [
                'price' => (float)$this->trip['price'],
                'seats' => $this->trip['seats'],
                'vehicle_id' => $this->trip['vehicle_id'],
                'user_id' => $this->userId,
            ]
        );

        $this->assertDatabaseHas(
            'routes',
            [
                'trip_id' => json_decode($response->getContent())->id,
            ]
        );
        $search = '?fc=30.523400000000038|50.4501&fn=Київ%2C+місто+Київ%2C+Україна&start_at=1503694800&tc=36.230383000000074|49.9935&tn=Харьков%2C+Харьковская+область%2C+Украина';
        $response = $this->json('GET', self::ENDPOINT.$search);
        $response->assertStatus(200);
        $response->assertSee("350.00");
        $response->assertSee("\"total\":1");
        $response->assertSee("\"seats\":3");
    }

    /**
     * Test to find the no right data
     */
    public function test_search_no_exist_data(){
        $search = '?fc=30.523400000000038|50.4501&fn=Київ%2C+місто+Київ%2C+Україна&start_at=1503694800&tc=24.029717000000005|49.839683&tn=Львів%2C+Львівська+область%2C+Україна';
        $response = $this->json('GET', self::ENDPOINT.$search);
        $response->assertStatus(200);
        $response->assertJsonFragment($this->responseNoExistData);
    }

    public function test_search_filter_time_is_right(){
        $response = $this->create_trip();

        $response->assertStatus(200);
        $startAt = Carbon::now()->addHour(1)->timestamp;
        $hour = Carbon::now()->addHour(3)->hour;
        $search = '?fc=30.523400000000038|50.4501&start_at='.$startAt.'&tc=36.230383000000074|49.9935&sort=price&order=asc&page=1&limit=10&filter[price][min]=0&filter[price][max]=350&filter[time][min]='.$hour.'&filter[time][max]=24';
        $response = $this->json('GET', self::ENDPOINT.$search);
        $response->assertStatus(200);
//        dd($response);
        $response->assertSee("350.00");
        $response->assertSee("\"total\":1");
        $response->assertSee("\"seats\":3");

    }

    private function create_trip(){
        $user = $this->getDriverUser();

        $vehicle = factory(Vehicle::class)->create([
            'seats' => 4,
            'user_id' => $user->id,
        ]);

        $trip = $this->getValidTripData($vehicle->id);

        $createUrl = route('trips.create');

        $this->userId = $user->id;
        $this->trip = $trip;

        return $this->jsonRequestAsUser($user, $this->method, $createUrl, $trip);
    }

}
