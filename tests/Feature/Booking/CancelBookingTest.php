<?php

namespace Tests\Feature\Trips;

use App\User;
use Carbon\Carbon;
use App\Models\Trip;
use App\Models\Route;
use Tests\JwtTestCase;
use App\Models\Booking;
use App\Models\Vehicle;
use Illuminate\Support\Facades\Event;
use App\Events\ApprovedBookingCanceled;

class CancelBookingTest extends JwtTestCase
{
    protected $method = 'DELETE';
    protected $url;

    public function getUrl($id)
    {
        return route('booking.cancel', $id);
    }

    /**
     * @test
     */
    public function guest_cant_cancel_booking()
    {
        $data = $this->createTripWithDriverAndBooking();

        $response = $this->json($this->method, $this->getUrl($data['booking']->id));
        $response->assertStatus(400);
    }

    /**
     * @test
     */
    public function driver_cant_cancel_booking()
    {
        $data = $this->createTripWithDriverAndBooking();
        $this->url = $this->getUrl($data['trip']->id);

        $response = $this->jsonRequestAsUser($data['user'], $this->method, $this->url);
        $response->assertStatus(403);
    }

    /**
     * @test
     */
    public function passenger_cant_cancel_not_his_booking()
    {
        $data = $this->createTripWithDriverAndBooking();
        $this->url = $this->getUrl($data['trip']->id);

        $user = $this->getPassengerUser();

        $response = $this->jsonRequestAsUser($user, $this->method, $this->url);
        $response->assertStatus(403);
    }

    /**
     * @test
     */
    public function passenger_cant_cancel_booking_for_past_trip()
    {
        $data = $this->createTripWithDriverAndBooking([
            'end_at' => Carbon::now()->subHour(1)->toDateTimeString(),
        ]);
        $this->url = $this->getUrl($data['trip']->id);

        $response = $this->jsonRequestAsUser($data['passenger'], $this->method, $this->url);
        $response->assertStatus(422);
    }

    /**
     * @test
     */
    public function passenger_cant_cancel_booking_for_started_trip()
    {
        $data = $this->createTripWithDriverAndBooking([
            'start_at' => Carbon::now()->subHour(1)->toDateTimeString(),
        ]);
        $this->url = $this->getUrl($data['trip']->id);

        $response = $this->jsonRequestAsUser($data['passenger'], $this->method, $this->url);
        $response->assertStatus(422);
    }

    /**
     * @test
     */
    public function passenger_can_cancel_booking()
    {
        Event::fake();
        $data = $this->createTripWithDriverAndBooking();
        $this->url = $this->getUrl($data['trip']->id);

        $response = $this->jsonRequestAsUser($data['passenger'], $this->method, $this->url);
        $response->assertStatus(200);

        Event::assertNotDispatched(ApprovedBookingCanceled::class);

        $this->assertDatabaseHas('bookings', [
            'id' => $data['booking']->id,
            'status' => Booking::STATUS_CANCELED,
        ]);
    }

    /**
     * @test
     */
    public function passenger_can_cancel_booking_and_event_is_dispatched_if_booking_was_approved()
    {
        Event::fake();
        $data = $this->createTripWithDriverAndBooking([], ['status' => Booking::STATUS_APPROVED]);
        $this->url = $this->getUrl($data['trip']->id);

        $response = $this->jsonRequestAsUser($data['passenger'], $this->method, $this->url);
        $response->assertStatus(200);

        Event::assertDispatched(ApprovedBookingCanceled::class, function ($event) use ($data) {
            return $event->booking->id === $data['booking']->id && $event->booking->trip->user->id === $data['user']->id;
        });

        $this->assertDatabaseHas('bookings', [
            'id' => $data['booking']->id,
            'status' => Booking::STATUS_CANCELED,
        ]);
    }

    /**
     * @param array $tripDetails
     * @param array $bookingDetails
     * @return array
     */
    private function createTripWithDriverAndBooking($tripDetails = [], $bookingDetails = [])
    {
        $user = $this->getDriverUser();
        $vehicle = factory(Vehicle::class)->create(['user_id' => $user->id, 'seats' => 2]);
        $trip = factory(Trip::class)->create(array_merge(['user_id' => $user->id, 'vehicle_id' => $vehicle->id, 'seats' => 2], $tripDetails));
        $routes = factory(Route::class, 2)->create(['trip_id' => $trip->id]);

        $passenger = $this->getPassengerUser();
        $booking = factory(Booking::class)->create(array_merge(['user_id' => $passenger->id, 'trip_id' => $trip->id, 'seats' => 1, 'status' => Booking::STATUS_PENDING], $bookingDetails));

        return compact('user', 'vehicle', 'trip', 'routes', 'passenger', 'booking');
    }

    protected function getPassengerUser()
    {
        return factory(User::class)->create(['permissions' => User::PASSENGER_PERMISSION]);
    }

    protected function getDriverUser()
    {
        return factory(User::class)->create(['permissions' => User::DRIVER_PERMISSION]);
    }
}
