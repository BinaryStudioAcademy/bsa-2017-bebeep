<?php

namespace Tests\Feature\Trips;

use App\Models\{Trip, Vehicle, Route};
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class DeleteTripTest extends TestCase
{
    use DatabaseMigrations, DatabaseTransactions;

    private $url = 'api/trip/delete';
    private $method = 'DELETE';

    public function user_can_not_delete_trip_if_trip_id_is_not_correct()
    {
        factory(User::class)->create();
        factory(Vehicle::class)->create();
        $trip = factory(Trip::class)->create();
        $routes = factory(Route::class)->create();

        $response = $this->json($this->method, $this->url, ['id' => null]);
        $response->assertStatus(422)->assertJsonStructure(['id' => []]);

        $response = $this->json($this->method, $this->url, ['id' => 5]);
        $response->assertStatus(404);

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
                'from' => $routes->from,
                'to' => $routes->to,
                'trip_id' => $trip->id
            ]
        );

    }

    public function user_can_delete_trip()
    {
        factory(User::class)->create();
        factory(Vehicle::class)->create();
        factory(Trip::class)->create();
        factory(Route::class)->create();

        $response = $this->json($this->method, $this->url, ['id' => 1]);
        $response->assertStatus(200);

        $this->assertDatabaseMissing('trips', ['id' => 1]);
        $this->assertDatabaseMissing('routes', ['trip_id' => 1]);
    }

    /**
     * @test
     * Add a test to check if the user has driver permissions
     */
    public function user_can_not_delete_trip_without_driver_permissions(){}

    /**
     * @test
     * Add a test to check if a trip haven't passengers
     */
    public function user_can_not_delete_trip_with_passengers(){}

}
