<?php

namespace Tests\Feature\Trips;

use App\Models\{Trip, Vehicle};
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Carbon\Carbon;

class UpdateTripTest extends BaseTripTestCase
{
    use DatabaseMigrations, DatabaseTransactions;

    private $url;
    private $method = 'PATCH';

    /**
     * @test
     */
    public function user_can_not_update_trip_if_not_all_fields_is_filled()
    {
        $trip = factory(Trip::class)->create();
        $this->url = $this->getUrl($trip->id);

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
    public function user_can_not_update_trip_with_wrong_data()
    {
        $trip = factory(Trip::class)->create();
        $this->url = $this->getUrl($trip->id);

        $response = $this->json($this->method, $this->url, $this->getTripData(['start_at' => str_random(10)]));
        $response->assertStatus(422)->assertJsonStructure(['start_at' => []]);

        $response = $this->json($this->method, $this->url, $this->getTripData(['end_at' => str_random(10)]));
        $response->assertStatus(422)->assertJsonStructure(['end_at' => []]);

        $response = $this->json($this->method, $this->url, $this->getTripData(
            ['start_at' => Carbon::now()->subHour(3)->timestamp]
        ));
        $response->assertStatus(422)->assertJsonStructure(['start_at' => []]);

        $response = $this->json($this->method, $this->url, $this->getTripData(
            [
                'start_at' => Carbon::now()->addHour(1)->timestamp,
                'end_at' => Carbon::now()->timestamp
            ]
        ));
        $response->assertStatus(422)->assertJsonStructure(['end_at' => []]);
    }

    public function user_can_successfully_update_trip_with_valid_data()
    {
        $user = factory(User::class)->create();
        $vehicle = factory(Vehicle::class)->create([
            'seats' => 4,
            'user_id' => $user->id,
        ]);

        $trip = array_merge(factory(Trip::class)->make([
            'price' => 250,
            'seats' => 2,
            'vehicle_id' => $vehicle->id,
            'user_id' => $vehicle->user_id
        ])->toArray(), [
            'start_at' => Carbon::now()->addHour(1)->timestamp,
            'end_at' => Carbon::now()->addHour(10)->timestamp,
        ]);

        $this->url = $this->getUrl($trip->id);

        $response = $this->json($this->method, $this->url, array_merge(
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
    public function user_can_not_update_trip_without_driver_permissions(){}

    /**
     * Get url from trips.update route
     *
     * @param $id
     * @return string
     */
    private function getUrl($id)
    {
        return route('trips.update', $id);
    }
}
