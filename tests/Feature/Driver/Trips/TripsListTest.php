<?php
namespace Tests\Feature\Driver\Trip;

use App\Models\Route;
use App\Models\Trip;
use App\Models\Vehicle;
use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class TripsListTest extends TestCase
{
    use DatabaseMigrations, DatabaseTransactions;

    protected $method = 'GET';
    protected $url = 'api/v1/trips';

    /** @test */
    public function user_can_see_trips()
    {
        $user = factory(User::class)->create();
        $vehicle = factory(Vehicle::class)->create(['user_id'=>$user->id]);
        $trip = factory(Trip::class)->create(
            [
                'price' => 100,
                'seats' => 1,
                'vehicle_id' => $vehicle->id,
                'user_id' => $user->id
            ]
        );
        $route = factory(Route::class)->create(['trip_id' => $trip->id]);

        $response = $this->json($this->method, $this->url);
        $response->assertStatus(200);
        $response->assertExactJson([[
            'id' => $trip->id,
            'from'=> json_encode($route->from),
            'to' =>  json_encode($route->to),
            'brand' => $vehicle->brand,
            'model' => $vehicle->model,
            'start_at'=> $trip->start_at->toDateTimeString(),
            'end_at' => $trip->end_at->toDateTimeString()
        ]]);
    }

    /** @test */
    public function see_error_if_user_doesnt_have_trips()
    {
        $user = factory(User::class)->create();
        $vehicle = factory(Vehicle::class)->create(['user_id'=>$user->id]);
        $response = $this->json($this->method, $this->url);
        $response->assertStatus(422);
        $response->assertJson(['error'=>'trips not found']);
    }


}