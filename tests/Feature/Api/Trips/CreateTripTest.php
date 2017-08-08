<?php

namespace Tests\Feature\Api\Trips;

use App\Models\Trip;
use App\Models\Vehicle;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class CreateTripTest extends TestCase
{
    use DatabaseMigrations;

    private $url = 'api/trip/create';

    /**
     * @test
     */
    public function user_can_not_create_trip_if_not_all_fields_is_filled()
    {
        $response = $this->json('POST', $this->url, []);
        $response->assertStatus(422);

        $response = $this->json('POST', $this->url,
            factory(Trip::class)->make(['id' => null])->toArray());
        $response->assertStatus(422)->assertJsonStructure(['id' => []]);

        $response = $this->json('POST', $this->url,
            factory(Trip::class)->make(['price' => null])->toArray());
        $response->assertStatus(422)->assertJsonStructure(['price' => []]);

        $response = $this->json('POST', $this->url,
            factory(Trip::class)->make(['start_at' => null])->toArray());
        $response->assertStatus(422)->assertJsonStructure(['start_at' => []]);

        $response = $this->json('POST', $this->url,
            factory(Trip::class)->make(['end_at' => null])->toArray());
        $response->assertStatus(422)->assertJsonStructure(['end_at' => []]);

        $response = $this->json('POST', $this->url,
            factory(Trip::class)->make(['vehicle_id' => null])->toArray());
        $response->assertStatus(422)->assertJsonStructure(['vehicle_id' => []]);

        $response = $this->json('POST', $this->url,
            factory(Trip::class)->make(['user_id' => null])->toArray());
        $response->assertStatus(422)->assertJsonStructure(['user_id' => []]);

        $response = $this->json('POST', $this->url,
            array_merge(factory(Trip::class)->make()->toArray()), ['from' => null]);
        $response->assertStatus(422)->assertJsonStructure(['from' => []]);

        $response = $this->json('POST', $this->url,
            array_merge(factory(Trip::class)->make()->toArray()), ['to' => null]);
        $response->assertStatus(422)->assertJsonStructure(['to' => []]);
    }

    /**
     * @test
     */
    public function user_can_not_create_trip_with_wrong_data()
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
        $trip = factory(Trip::class)->make(
            [
                'price' => 350,
                'seats' => 3,
                'vehicle_id' => 1,
                'user_id' => 1
            ]
        );

        $response = $this->json('POST', $this->url, array_merge(
            $trip->toArray(),
            [
                'car_id' => 1,
                'from' => ['a'],
                'to' => ['b']
            ]
        ));

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
