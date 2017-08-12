<?php
namespace Tests\Feature\Driver\Trip;

use App\Models\Route;
use App\Models\Trip;
use App\Models\Vehicle;
use App\User;
use Carbon\Carbon;
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
        $response->assertJsonFragment([[
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
    public function see_empty_array_if_user_doesnt_have_trips()
    {
        $user = factory(User::class)->create();
        $vehicle = factory(Vehicle::class)->create(['user_id'=>$user->id]);
        $response = $this->json($this->method, $this->url);
        $response->assertStatus(200);
        $response->assertJson([]);
    }

    /** @test */
    public function try_using_past_and_future_filters()
    {
        $user = factory(User::class)->create();
        $vehicle = factory(Vehicle::class)->create(['user_id'=>$user->id]);
        $trip = factory(Trip::class)->create(
            ['seats'=>1,'price' => 100, 'vehicle_id' => $vehicle->id, 'user_id' => $user->id]
        );
        $route = factory(Route::class)->create(['trip_id' => $trip->id]);

        $trip2 = factory(Trip::class)->create(
            ['seats'=>1,'price' => 100,'start_at' => Carbon::tomorrow(), 'vehicle_id' => $vehicle->id, 'user_id' => $user->id]
        );
        $route2 = factory(Route::class)->create(['trip_id' => $trip2->id]);

        $response = $this->json($this->method, $this->url,['filter'=>'past']);
        $response->assertStatus(200);
        $response->assertJson([[
            'id' => $trip->id,
            'from'=> json_encode($route->from),
            'to' =>  json_encode($route->to),
            'brand' => $vehicle->brand,
            'model' => $vehicle->model,
            'start_at'=> $trip->start_at->toDateTimeString(),
            'end_at' => $trip->end_at->toDateTimeString()
        ]]);


        $response = $this->json($this->method, $this->url,['filter'=>'upcoming']);
        $response->assertStatus(200);
        $response->assertJson([[
            'id' => $trip2->id,
            'from'=> json_encode($route2->from),
            'to' =>  json_encode($route2->to),
            'brand' => $vehicle->brand,
            'model' => $vehicle->model,
            'start_at'=> $trip2->start_at->toDateTimeString(),
            'end_at' => $trip2->end_at->toDateTimeString()
        ]]);
    }
}