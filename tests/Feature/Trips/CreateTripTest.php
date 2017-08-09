<?php

namespace Tests\Feature\Trips;

use App\Models\Trip;
use App\Models\Vehicle;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class CreateTripTest extends TestCase
{
    use DatabaseMigrations, DatabaseTransactions;

    private $url = 'api/trip/create';
    private $method = 'POST';

    /**
     * @test
     */
    public function user_can_not_create_trip_if_not_all_fields_is_filled()
    {
        $response = $this->json($this->method, $this->url, []);
        $response->assertStatus(422);

        $response = $this->json($this->method, $this->url,
            factory(Trip::class)->make(['price' => null])->toArray());
        $response->assertStatus(422)->assertJsonStructure(['price' => []]);

        $response = $this->json($this->method, $this->url,
            factory(Trip::class)->make(['start_at' => null])->toArray());
        $response->assertStatus(422)->assertJsonStructure(['start_at' => []]);

        $response = $this->json($this->method, $this->url,
            factory(Trip::class)->make(['end_at' => null])->toArray());
        $response->assertStatus(422)->assertJsonStructure(['end_at' => []]);

        $response = $this->json($this->method, $this->url,
            factory(Trip::class)->make(['vehicle_id' => null])->toArray());
        $response->assertStatus(422)->assertJsonStructure(['vehicle_id' => []]);

        $response = $this->json($this->method, $this->url,
            array_merge(factory(Trip::class)->make()->toArray()), ['from' => null]);
        $response->assertStatus(422)->assertJsonStructure(['from' => []]);

        $response = $this->json($this->method, $this->url,
            array_merge(factory(Trip::class)->make()->toArray()), ['to' => null]);
        $response->assertStatus(422)->assertJsonStructure(['to' => []]);
    }

    /**
     * @test
     */
    public function user_can_not_create_trip_with_wrong_time_data()
    {
        $response = $this->json('POST', $this->url,
            factory(Trip::class)->make(
                [
                    'start_at' => str_random(10)
                ]
            )->toArray());
        $response->assertStatus(422);

        $response = $this->json('POST', $this->url,
            factory(Trip::class)->make(
                [
                    'end_at' => str_random(10)
                ]
            )->toArray());
        $response->assertStatus(422);

        $response = $this->json('POST', $this->url,
            factory(Trip::class)->make(
                [
                    'start_at' => date('Y-m-d H:i:s', strtotime("-1 hour"))
                ]
            )->toArray());
        $response->assertStatus(422);

        $response = $this->json('POST', $this->url,
            factory(Trip::class)->make(
                [
                    'end_at' => date("Y-m-d H:i:s"),
                    'start_at' => date('Y-m-d H:i:s', strtotime("+1 days"))
                ]
            )->toArray());
        $response->assertStatus(422);
    }

    /**
     * @test
     */
    public function user_can_not_create_trip_with_wrong_car_data()
    {
        $response = $this->json('POST', $this->url,
            array_merge(factory(Trip::class)->make()->toArray(), ['car_id' => 2]));
        $response->assertStatus(422);

        factory(Vehicle::class)->make(['seats' => 4, 'user_id' => 1]);
        $response = $this->json('POST', $this->url,
            factory(Trip::class)->make([
                'seats' => 5
            ])->toArray());
        $response->assertStatus(422);

        $response = $this->json('POST', $this->url,
            factory(Trip::class)->make([
                'seats' => -1
            ])->toArray());
        $response->assertStatus(422);
    }

    /**
     * @test
     */
    public function user_can_create_trip_if_all_data_is_valid()
    {
        $user = factory(User::class)->create();
        $vehicle = factory(Vehicle::class)->create([
            'seats' => 4,
            'user_id' => 1
        ]);

        $trip = factory(Trip::class)->make(
            [
                'price' => 350,
                'seats' => 3,
                'vehicle_id' => $vehicle->id,
                'user_id' => $user->id
            ]
        );

        $response = $this->json('POST', $this->url, array_merge(
            $trip->toArray(),
            [
                'from' => ['a'],
                'to' => ['b'],
                'trip_id' => $trip->id
            ]
        ));
        $response->assertStatus(200);

        $this->assertDatabaseHas(
          'trips',
          [
              'price' => $trip->price,
              'seats' => $trip->seats,
              'start_at' => $trip->start_at,
              'end_at' => $trip->end_at,
              'vehicle_id' => $trip->vehicle_id,
              'user_id' => $trip->user_id
          ]
        );

        $this->assertDatabaseHas(
            'routes',
            [
                'from' => ['a'],
                'to' => ['b'],
                'trip_id' => $trip->id
            ]
        );
    }

    /**
     * @test
     * Add a test to check if the user has driver permissions
     */
    public function user_can_not_create_trip_without_driver_permissions(){}
}
