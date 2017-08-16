<?php

namespace Tests\Feature\Trips;

use App\Models\Trip;
use App\Models\Vehicle;
use App\User;
use Carbon\Carbon;

class ListDriverTripsTest extends BaseTripTestCase
{
    protected $url;
    protected $method = 'GET';

    public function setUp()
    {
        parent::setUp();
    }

    /**
     * @test
     */
    public function guest_cant_list_trips()
    {
        $this->url = route('trips.all');
        $response = $this->json($this->method, $this->url, []);
        $response->assertStatus(400);

        $this->url = route('trips.upcoming');
        $response = $this->json($this->method, $this->url, []);
        $response->assertStatus(400);

        $this->url = route('trips.past');
        $response = $this->json($this->method, $this->url, []);
        $response->assertStatus(400);
    }

    /**
     * @test
     */
    public function user_can_list_all_his_trips()
    {
        $user = $this->getDriverUser();
        $vehicle = factory(Vehicle::class)->create(['user_id' => $user->id]);

        $user2 = factory(User::class)->create();
        $vehicle2 = factory(Vehicle::class)->create(['user_id' => $user2->id]);

        factory(Trip::class, 10)->create(['user_id' => $user2->id, 'vehicle_id' => $vehicle2->id]);
        factory(Trip::class, 10)->create(['user_id' => $user->id, 'vehicle_id' => $vehicle->id]);

        $this->url = route('trips.all');
        $response = $this->jsonAsUser($user);
        $response->assertStatus(200);
        $this->assertCount(10, $response->json());
    }

    /**
     * @test
     */
    public function user_can_list_upcoming_trips_only()
    {
        $user = $this->getDriverUser();
        $vehicle = factory(Vehicle::class)->create(['user_id' => $user->id]);

        $user2 = factory(User::class)->create();
        $vehicle2 = factory(Vehicle::class)->create(['user_id' => $user2->id]);

        factory(Trip::class, 10)->create(['user_id' => $user2->id, 'vehicle_id' => $vehicle2->id]);
        factory(Trip::class, 10)->create(['user_id' => $user->id, 'vehicle_id' => $vehicle->id, 'start_at' => Carbon::now()->subHours(3)->toDateTimeString()]);
        factory(Trip::class, 5)->create(['user_id' => $user->id, 'vehicle_id' => $vehicle->id, 'start_at' => Carbon::now()->addHours(1)->toDateTimeString()]);

        $this->url = route('trips.upcoming');
        $response = $this->jsonAsUser($user);
        $response->assertStatus(200);
        $this->assertCount(5, $response->json());
    }

    /**
     * @test
     */
    public function user_can_list_past_trips_only()
    {
        $user = $this->getDriverUser();
        $vehicle = factory(Vehicle::class)->create(['user_id' => $user->id]);

        $user2 = factory(User::class)->create();
        $vehicle2 = factory(Vehicle::class)->create(['user_id' => $user2->id]);

        factory(Trip::class, 10)->create(['user_id' => $user2->id, 'vehicle_id' => $vehicle2->id]);
        factory(Trip::class, 10)->create(['user_id' => $user->id, 'vehicle_id' => $vehicle->id, 'start_at' => Carbon::now()->subHours(3)->toDateTimeString(), 'end_at' => Carbon::now()->subHours(1)->toDateTimeString()]);
        factory(Trip::class, 5)->create(['user_id' => $user->id, 'vehicle_id' => $vehicle->id, 'start_at' => Carbon::now()->addHours(1)->toDateTimeString()]);

        $this->url = route('trips.past');
        $response = $this->jsonAsUser($user);
        $response->assertStatus(200);
        $this->assertCount(10, $response->json());
    }

    /**
     * @test
     */
    public function user_can_not_list_trips_without_driver_permissions()
    {
        $user = factory(User::class)->create();

        $this->url = route('trips.all');
        $response = $this->jsonAsUser($user);
        $response->assertStatus(403);

        $this->url = route('trips.upcoming');
        $response = $this->jsonAsUser($user);
        $response->assertStatus(403);

        $this->url = route('trips.past');
        $response = $this->jsonAsUser($user);
        $response->assertStatus(403);
    }
}
