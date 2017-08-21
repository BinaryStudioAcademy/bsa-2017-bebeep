<?php

namespace Tests\Feature\Bookings;

use App\User;
use Carbon\Carbon;
use App\Models\Trip;
use Tests\JwtTestCase;
use App\Models\Booking;
use App\Models\Vehicle;

class BookingConfrmTest extends JwtTestCase
{
    public function getDriver()
    {
        return factory(User::class)->create(['permissions' => User::DRIVER_PERMISSION]);
    }

    public function getPassanger()
    {
        return factory(User::class)->create(['permissions' => User::PASSENGER_PERMISSION]);
    }

    public function getTrip(User $user, array $data = [])
    {
        $vehicle = factory(Vehicle::class)->create(['user_id' => $user->id]);
        return factory(Trip::class)->create(array_merge([
            'user_id' => $user->id,
            'vehicle_id' => $vehicle->id,
        ], $data));
    }

    /**
     * @test
     */
    public function owner_can_approve_trip()
    {
        $driver = $this->getDriver();
        $passanger = $this->getPassanger();
        $trip = $this->getTrip($driver);
        $booking = factory(Booking::class)->create(['user_id' => $passanger->id, 'trip_id' => $trip->id]);

        $response = $this->jsonRequestAsUser($driver, 'PUT', route('trips.booking.status', ['trip' => $trip, 'booking' => $booking]), [
            'status' => Booking::STATUS_APPROVED,
        ]);
        $response->assertStatus(200);
        $this->assertDatabaseHas(
            'bookings',
            [
                'status' => Booking::STATUS_APPROVED,
            ]
        );
    }

    /**
     * @test
     */
    public function owner_can_decline_trip()
    {
        $driver = $this->getDriver();
        $passanger = $this->getPassanger();
        $trip = $this->getTrip($driver);
        $booking = factory(Booking::class)->create(['user_id' => $passanger->id, 'trip_id' => $trip->id]);

        $response = $this->jsonRequestAsUser($driver, 'PUT', route('trips.booking.status', ['trip' => $trip, 'booking' => $booking]), [
            'status' => Booking::STATUS_DECLINED,
        ]);
        $response->assertStatus(200);
        $this->assertDatabaseHas(
            'bookings',
            [
                'status' => Booking::STATUS_DECLINED,
            ]
        );
    }

    /**
     * @test
     */
    public function not_owner_cant_change_status()
    {
        $driver = $this->getDriver();
        $driver2 = $this->getDriver();
        $passanger = $this->getPassanger();
        $trip = $this->getTrip($driver);
        $booking = factory(Booking::class)->create(['user_id' => $passanger->id, 'trip_id' => $trip->id]);

        $response = $this->jsonRequestAsUser($driver2, 'PUT', route('trips.booking.status', ['trip' => $trip, 'booking' => $booking]), [
            'status' => Booking::STATUS_APPROVED,
        ]);
        $response->assertStatus(422);
    }

    /**
     * @test
     */
    public function cant_change_status_if_trip_is_passed()
    {
        $driver = $this->getDriver();
        $passanger = $this->getPassanger();
        $trip = $this->getTrip($driver, [
            'start_at' => Carbon::now()->subDay(),
        ]);
        $booking = factory(Booking::class)->create(['user_id' => $passanger->id, 'trip_id' => $trip->id]);

        $response = $this->jsonRequestAsUser($driver, 'PUT', route('trips.booking.status', ['trip' => $trip, 'booking' => $booking]), [
            'status' => Booking::STATUS_APPROVED,
        ]);
        $response->assertStatus(422);
    }

    /**
     * @test
     */
    public function cant_change_status_if_booking_is_not_belong_trip()
    {
        $driver = $this->getDriver();
        $passanger = $this->getPassanger();
        $trip1 = $this->getTrip($driver);
        $trip2 = $this->getTrip($driver);
        $booking = factory(Booking::class)->create(['user_id' => $passanger->id, 'trip_id' => $trip1->id]);

        $response = $this->jsonRequestAsUser($driver, 'PUT', route('trips.booking.status', ['trip' => $trip2, 'booking' => $booking]), [
            'status' => Booking::STATUS_APPROVED,
        ]);
        $response->assertStatus(422);
    }
}
