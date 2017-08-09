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

class BaseTripTestCase extends JwtTestCase
{
    /**
     * @param $user
     * @param $data
     * @return \Illuminate\Foundation\Testing\TestResponse
     */
    protected function jsonAsUser($user, $data)
    {
        return $this->jsonRequestAsUser($user, $this->method, $this->url, $this->getTripData($data));
    }

    protected function getDriverUser()
    {
        return factory(User::class)->create(['permissions' => User::DRIVER_PERMISSION]);
    }

    /**
     * Return basic trip data for testing with extraData
     *
     * @param array $extraData
     * @return array
     */
    protected function getTripData($extraData = [])
    {
        return array_merge(factory(Trip::class)->make()->toArray(), [
            'end_at' => Carbon::now()->timestamp,
            'start_at' => Carbon::now()->addHour(1)->timestamp,
            'from' => ['a'],
            'to' => ['b'],
        ], $extraData);
    }

    /**
     * @param $vehicleId
     * @return array
     */
    protected function getValidTripData($vehicleId)
    {
        return array_merge(factory(Trip::class)->make([
            'price' => 350,
            'seats' => 3,
            'vehicle_id' => $vehicleId,
        ])->toArray(), [
            'start_at' => Carbon::now()->addMinutes(10)->timestamp,
            'end_at' => Carbon::now()->addHour(1)->timestamp,
            'from' => ['a'],
            'to' => ['b'],
        ]);
    }
}
