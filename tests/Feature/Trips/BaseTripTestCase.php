<?php

namespace Tests\Feature\Trips;

use App\Models\Trip;
use App\User;
use Carbon\Carbon;
use Tests\JwtTestCase;

class BaseTripTestCase extends JwtTestCase
{
    /**
     * @param $user
     * @param $data
     * @return \Illuminate\Foundation\Testing\TestResponse
     */
    protected function jsonAsUser($user, $data = [])
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
            'start_at' => Carbon::now()->addSeconds(Trip::MIN_DELAY_TO_START_DATE + 60)->timestamp,
            'end_at' => Carbon::now()->addSeconds(Trip::MIN_DELAY_TO_START_DATE)->addHour(1)->timestamp,
            'from' => ['a'],
            'to' => ['b'],
        ]);
    }
}
