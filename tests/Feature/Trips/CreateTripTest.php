<?php

namespace Tests\Feature\Trips;

use App\Models\Trip;
use App\Models\Vehicle;
use App\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class CreateTripTest extends TestCase
{
    use DatabaseMigrations, DatabaseTransactions;

    private $url;
    private $method = 'POST';

    public function setUp()
    {
        parent::setUp();

        $this->url = route('trips.create');
    }

    /**
     * @test
     */
    public function user_can_not_create_trip_if_not_all_fields_is_filled()
    {
        $response = $this->json($this->method, $this->url, []);
        $response->assertStatus(422);

        $response = $this->json($this->method, $this->url, $this->getTripData(['price' => null]));
        $response->assertStatus(422)->assertJsonStructure(['price' => []]);

        $response = $this->json($this->method, $this->url, $this->getTripData(['start_at' => null]));
        $response->assertStatus(422)->assertJsonStructure(['start_at' => []]);

        $response = $this->json($this->method, $this->url, $this->getTripData(['end_at' => null]));
        $response->assertStatus(422)->assertJsonStructure(['end_at' => []]);

        $response = $this->json($this->method, $this->url, $this->getTripData(['vehicle_id' => null]));
        $response->assertStatus(422)->assertJsonStructure(['vehicle_id' => []]);

        $response = $this->json($this->method, $this->url, $this->getTripData(['from' => null]));
        $response->assertStatus(422)->assertJsonStructure(['from' => []]);

        $response = $this->json($this->method, $this->url, $this->getTripData(['to' => null]));
        $response->assertStatus(422)->assertJsonStructure(['to' => []]);
    }

    /**
     * @test
     */
    public function user_can_not_create_trip_with_wrong_time_data()
    {
        $response = $this->json('POST', $this->url, $this->getTripData(['start_at' => str_random(10)]));
        $response->assertStatus(422)->assertJsonStructure(['start_at' => []]);

        $response = $this->json('POST', $this->url, $this->getTripData(['end_at' => str_random(10)]));
        $response->assertStatus(422)->assertJsonStructure(['end_at' => []]);

        $response = $this->json('POST', $this->url, $this->getTripData(
            ['start_at' => Carbon::now()->subHour(1)->timestamp]
        ));
        $response->assertStatus(422);

        $response = $this->json('POST', $this->url, $this->getTripData(
            [
                'end_at' => Carbon::now()->timestamp,
                'start_at' => Carbon::now()->addHour(1)->timestamp,
            ]
        ));
        $response->assertStatus(422);
    }

    /**
     * @test
     */
    public function user_can_not_create_trip_with_wrong_car_data()
    {
        $response = $this->json('POST', $this->url, $this->getTripData(['vehicle_id' => 2]));
        $response->assertStatus(422)->assertJsonStructure(['vehicle_id' => []]);

        $user = factory(User::class)->create();
        $vehicle = factory(Vehicle::class)->create(['seats' => 4, 'user_id' => $user->id]);
        $response = $this->json('POST', $this->url, $this->getTripData(['seats' => 5, 'vehicle_id' => $vehicle->id]));
        $response->assertStatus(422)->assertJsonStructure(['seats' => []]);

        $response = $this->json('POST', $this->url, $this->getTripData(['seats' => -1, 'vehicle_id' => $vehicle->id]));
        $response->assertStatus(422)->assertJsonStructure(['seats' => []]);
    }

    /**
     * @test
     */
    public function user_can_create_trip_if_all_data_is_valid()
    {
        $user = factory(User::class)->create();
        $vehicle = factory(Vehicle::class)->create([
            'seats' => 4,
            'user_id' => $user->id,
        ]);

        $trip = array_merge(factory(Trip::class)->make([
            'price' => 350,
            'seats' => 3,
            'vehicle_id' => $vehicle->id,
            'user_id' => $user->id
        ])->toArray(), [
            'end_at' => Carbon::now()->timestamp,
            'start_at' => Carbon::now()->addHour(1)->timestamp,
        ]);

        $response = $this->json('POST', $this->url, array_merge(
            $trip,
            [
                'from' => ['a'],
                'to' => ['b'],
            ]
        ));
        $response->assertStatus(200);

        $this->assertDatabaseHas(
          'trips',
          [
              'price' => (float) $trip['price'],
              'seats' => $trip['seats'],
              'vehicle_id' => $trip['vehicle_id'],
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
     * Add a test to check if the user has driver permissions
     */
    public function user_can_not_create_trip_without_driver_permissions(){}

    private function getTripData($extraData = [])
    {
        return array_merge(factory(Trip::class)->make()->toArray(), [
            'end_at' => Carbon::now()->timestamp,
            'start_at' => Carbon::now()->addHour(1)->timestamp,
            'from' => ['a'],
            'to' => ['b'],
        ], $extraData);
    }
}
