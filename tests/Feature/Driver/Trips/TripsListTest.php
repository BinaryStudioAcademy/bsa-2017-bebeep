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
    protected $url = 'api/driver/trips';

    /** @test */
    public function driver_can_see_trips(){
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
        $route = factory(Route::class)->create(['trip_id'=> $trip->id]);

        $response = $this->json('GET', $this->url,['id'=>$user->id]);
        $response->assertJson([
            'from'=> json_encode($route->from),
            'to' =>  json_encode($route->to),
            'brand' => $vehicle->brand,
            'model' => $vehicle->model,
            'start_at'=> $trip->start_at->toDateTimeString(),
            'end_at' => $trip->end_at->toDateTimeString()
        ]);
    }

}