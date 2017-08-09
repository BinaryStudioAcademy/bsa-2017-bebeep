<?php

namespace Tests\Feature\Trips;

use App\Models\Trip;
use App\Models\Vehicle;
use App\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\JwtTestCase;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class CreateTripTest extends JwtTestCase
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
    public function guest_cant_create_trip()
    {
        $response = $this->json($this->method, $this->url, []);
        $response->assertStatus(400);
    }

    /**
     * @test
     */
    public function user_can_not_create_trip_if_not_all_fields_is_filled()
    {
        $user = factory(User::class)->create();

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
    public function user_can_not_create_trip_with_wrong_time_data()
    {
        $user = factory(User::class)->create();
        $vehicle = factory(Vehicle::class)->create(['seats' => 4, 'user_id' => $user->id]);

        $response = $this->jsonAsUser($user, ['start_at' => str_random(10), 'vehicle_id' => $vehicle->id]);
        $response->assertStatus(422)->assertJsonStructure(['start_at' => []]);

        $response = $this->jsonAsUser($user, ['end_at' => str_random(10), 'vehicle_id' => $vehicle->id]);
        $response->assertStatus(422)->assertJsonStructure(['end_at' => []]);

        $response = $this->jsonAsUser($user, ['start_at' => Carbon::now()->subHour(1)->timestamp, 'vehicle_id' => $vehicle->id, 'seats' => 2]);
        $response->assertStatus(422)->assertJsonStructure(['start_at' => []]);

        $response = $this->jsonAsUser($user, [
                'end_at' => Carbon::now()->timestamp,
                'start_at' => Carbon::now()->addHour(1)->timestamp,
                'vehicle_id' => $vehicle->id,
                'seats' => 2
            ]
        );
        $response->assertStatus(422)->assertJsonStructure(['end_at' => []]);
    }

    /**
     * @test
     */
    public function user_can_not_create_trip_with_wrong_car_data()
    {
        $user = factory(User::class)->create();

        $response = $this->jsonAsUser($user, ['vehicle_id' => 2]);
        $response->assertStatus(422)->assertJsonStructure(['vehicle_id' => []]);

        $vehicle = factory(Vehicle::class)->create(['seats' => 4, 'user_id' => $user->id]);

        $response = $this->jsonAsUser($user, ['seats' => 5, 'vehicle_id' => $vehicle->id]);
        $response->assertStatus(422)->assertJsonStructure(['seats' => []]);

        $response = $this->jsonAsUser($user, ['seats' => -1, 'vehicle_id' => $vehicle->id]);
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
            'start_at' => Carbon::now()->addMinutes(10)->timestamp,
            'end_at' => Carbon::now()->addHour(1)->timestamp,
        ]);

        $response = $this->jsonRequestAsUser($user, $this->method, $this->url, array_merge(
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

    /**
     * @param $user
     * @param $data
     * @return \Illuminate\Foundation\Testing\TestResponse
     */
    private function jsonAsUser($user, $data)
    {
        return $this->jsonRequestAsUser($user, $this->method, $this->url, $this->getTripData($data));
    }

    /**
     * Return basic trip data for testing with extraData
     *
     * @param array $extraData
     * @return array
     */
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
