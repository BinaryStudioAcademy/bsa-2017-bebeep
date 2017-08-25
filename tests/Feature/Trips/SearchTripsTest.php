<?php

namespace Tests\Feature\Trips;

use App\User;
use Carbon\Carbon;
use App\Models\Trip;
use App\Models\Vehicle;

class SearchTripsTest extends BaseTripTestCase
{
    const ENDPOINT = '/api/v1/trips/search';

    protected $method = 'POST';

    public $responseNoExistData = [
        'data' => []
    ];

    public $responseExistData = [['data'=>
        ['meta' => [
            'total'=>1,
            'price'=>[
                'min' => '350.00',
                'max' => '350.00',
        ]]]]];



    public function test_search_exist_data()
    {
        $user = $this->getDriverUser();

        $vehicle = factory(Vehicle::class)->create([
            'seats' => 4,
            'user_id' => $user->id,
        ]);

        $trip = $this->getValidTripData($vehicle->id);

        $createUrl = route('trips.create');
        $response = $this->jsonRequestAsUser($user, $this->method, $createUrl, $trip);
        $response->assertStatus(200);

        $this->assertDatabaseHas(
            'trips',
            [
                'price' => (float)$trip['price'],
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
        $search = '?fc=30.523400000000038|50.4501&fn=Київ%2C+місто+Київ%2C+Україна&start_at=1503694800&tc=36.230383000000074|49.9935&tn=Харьков%2C+Харьковская+область%2C+Украина';
        $response = $this->json('GET', self::ENDPOINT.$search);
        $response->assertStatus(200);
        $response->assertSee("350.00");
        $response->assertSee("\"total\":1");
        $response->assertSee("\"seats\":3");
    }

    public function test_no_exist_data(){
        $search = '?fc=30.523400000000038|50.4501&fn=Київ%2C+місто+Київ%2C+Україна&start_at=1503694800&tc=24.029717000000005|49.839683&tn=Львів%2C+Львівська+область%2C+Україна';
        $response = $this->json('GET', self::ENDPOINT.$search);
        $response->assertStatus(200);
        $response->assertJsonFragment($this->responseNoExistData);
    }

}
