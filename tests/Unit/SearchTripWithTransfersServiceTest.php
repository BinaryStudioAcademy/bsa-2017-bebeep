<?php

namespace Tests\Unit;

use App\User;
use Carbon\Carbon;
use Tests\TestCase;
use App\Models\Trip;
use App\Models\Vehicle;
use App\Services\SearchTripsWithTransfersService;

class SearchTripWithTransfersServiceTest extends TestCase
{
    const POINT_A = [50, 52];
    const POINT_B = [54, 56];
    const POINT_C = [58, 60];
    const POINT_D = [60, 62];

    /**
     * @test
     */
    public function case_1()
    {
        $this->createTrip([self::POINT_A, self::POINT_B]);
        $this->createTrip([self::POINT_B, self::POINT_C]);
        $this->createTrip([self::POINT_B, self::POINT_A, self::POINT_C]);

        $service = app()->make(SearchTripsWithTransfersService::class);
        $searchRequest = new SearchTripRequest();
        $searchRequest->fromLat = self::POINT_A[0];
        $searchRequest->fromLng = self::POINT_A[1];
        $searchRequest->toLat = self::POINT_C[0];
        $searchRequest->toLng = self::POINT_C[1];

        $possibleRoutes = $service->search($searchRequest);

        $this->assertEquals(2, $possibleRoutes['data']->count());
    }

    /**
     * @test
     */
    public function case_2()
    {
        $this->createTrips([self::POINT_A, self::POINT_B], 2);
        $this->createTrips([self::POINT_B, self::POINT_C], 2);

        $service = app()->make(SearchTripsWithTransfersService::class);
        $searchRequest = new SearchTripRequest();
        $searchRequest->fromLat = self::POINT_A[0];
        $searchRequest->fromLng = self::POINT_A[1];
        $searchRequest->toLat = self::POINT_C[0];
        $searchRequest->toLng = self::POINT_C[1];

        $possibleRoutes = $service->search($searchRequest);

        $this->assertEquals(4, $possibleRoutes['data']->count());
    }

    /**
     * @test
     */
    public function case_3()
    {
        $this->createTrip([self::POINT_A, self::POINT_D]);
        $this->createTrip([self::POINT_A, self::POINT_B]);
        $this->createTrip([self::POINT_B, self::POINT_C]);
        $this->createTrip([self::POINT_C, self::POINT_D]);

        $service = app()->make(SearchTripsWithTransfersService::class);
        $searchRequest = new SearchTripRequest();
        $searchRequest->fromLat = self::POINT_A[0];
        $searchRequest->fromLng = self::POINT_A[1];
        $searchRequest->toLat = self::POINT_D[0];
        $searchRequest->toLng = self::POINT_D[1];

        $searchRequest->transfers = 3;
        $possibleRoutes = $service->search($searchRequest);
        $this->assertEquals(2, $possibleRoutes['data']->count());

        $searchRequest->transfers = 1;
        $possibleRoutes = $service->search($searchRequest);
        $this->assertEquals(1, $possibleRoutes['data']->count());
    }

    /**
     * @test
     */
    public function case_4()
    {
        $this->createTrip([self::POINT_A, self::POINT_D], Carbon::now()->subHour(1));
        $this->createTrip([self::POINT_A, self::POINT_B]);
        $this->createTrip([self::POINT_B, self::POINT_C]);
        $this->createTrip([self::POINT_C, self::POINT_D]);

        $service = app()->make(SearchTripsWithTransfersService::class);
        $searchRequest = new SearchTripRequest();
        $searchRequest->fromLat = self::POINT_A[0];
        $searchRequest->fromLng = self::POINT_A[1];
        $searchRequest->toLat = self::POINT_D[0];
        $searchRequest->toLng = self::POINT_D[1];

        $searchRequest->transfers = 10;
        $possibleRoutes = $service->search($searchRequest);
        $this->assertEquals(1, $possibleRoutes['data']->count());
    }

    /**
     * @param $routes
     * @param $count
     * @param null $startAt
     */
    private function createTrips($routes, $count, $startAt = null)
    {
        foreach (range(1, $count) as $item) {
            $this->createTrip($routes, $startAt);
        }
    }

    /**
     * @param $routes
     * @param null $startAt
     * @return mixed
     */
    private function createTrip($routes, $startAt = null)
    {
        $driver = factory(User::class)->create([
            'permissions' => User::DRIVER_PERMISSION,
        ]);

        $vehicle = factory(Vehicle::class)->create([
            'user_id' => $driver->id,
        ]);

        $trip = factory(Trip::class)->create([
            'user_id' => $driver->id,
            'vehicle_id' => $vehicle->id,
            'start_at' => $startAt ?? Carbon::now()->addHour(1),
        ]);

        foreach ($this->getRoutesFromWaypoints($routes) as $key => $route) {
            $trip->routes()->create(array_merge($route, [
                'start_at' => $startAt ?? Carbon::now()->addHour(1),
                'end_at' => $startAt ? $startAt->addMinutes($key) : Carbon::now()->addHour(2),
            ]));
        }

        return $trip;
    }

    /**
     * @param $waypoints
     * @return \Illuminate\Support\Collection
     */
    private function getRoutesFromWaypoints($waypoints)
    {
        $tripWaypoints = collect([]);
        $routes = collect([]);

        if (! empty($waypoints)) {
            foreach ($waypoints as $tripWaypoint) {
                $tripWaypoints->push($tripWaypoint);
            }
        }

        foreach (range(0, $tripWaypoints->count() - 2) as $iteration) {
            $chunk = $tripWaypoints->slice($iteration, 2)->values();

            $routes->push([
                'from' => implode('|', $chunk[0]),
                'from_lat' => $chunk[0][0],
                'from_lng' => $chunk[0][1],
                'to' => implode('|', $chunk[1]),
                'to_lat' => $chunk[1][0],
                'to_lng' => $chunk[1][1],
            ]);
        }

        return $routes;
    }
}
