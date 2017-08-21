<?php

namespace Tests\Feature\Trips;

use App\User;
use Carbon\Carbon;
use App\Models\Trip;
use App\Models\Route;
use App\Models\Booking;
use App\Models\Vehicle;

class CreateBookingTest extends BaseTripTestCase
{
    protected $method = 'POST';
    protected $url;

    public function getUrl($id)
    {
        return route('booking.create', $id);
    }

    /**
     * @test
     */
    public function guest_cant_create_booking()
    {
        $data = $this->createTripWithDriver();

        $response = $this->json($this->method, $this->getUrl($data['trip']->id), []);
        $response->assertStatus(400);
    }

    /**
     * @test
     */
    public function user_can_not_create_trip_if_not_all_fields_is_filled()
    {
        $data = $this->createTripWithDriver();
        $this->url = $this->getUrl($data['trip']->id);

        $user = $this->getPassengerUser();

        $response = $this->jsonAsUser($user, []);
        $response->assertStatus(422);

        $response = $this->jsonAsUser($user, ['seats' => null, 'routes' => [1, 2]]);
        $response->assertStatus(422)->assertJsonStructure(['seats' => []]);

        $response = $this->jsonAsUser($user, ['routes' => null, 'seats' => 1]);
        $response->assertStatus(422)->assertJsonStructure(['routes' => []]);
    }

    /**
     * @test
     */
    public function driver_cant_book_for_self_trip()
    {
        $data = $this->createTripWithDriver();
        $this->url = $this->getUrl($data['trip']->id);

        $response = $this->jsonAsUser($data['user'], ['routes' => [1, 2], 'seats' => 3]);
        $response->assertStatus(403);
    }

    /**
     * @test
     */
    public function user_cant_book_trip_with_non_existed_routes()
    {
        $data = $this->createTripWithDriver();
        $this->url = $this->getUrl($data['trip']->id);

        $user = $this->getPassengerUser();

        $response = $this->jsonAsUser($user, ['routes' => [3, 2], 'seats' => 3]);
        $response->assertStatus(422);
    }

    /**
     * @test
     */
    public function user_cant_book_trip_for_past_trip()
    {
        $data = $this->createTripWithDriver();
        $data['trip']->update(['end_at' => Carbon::now()->subYears(10)]);
        $this->url = $this->getUrl($data['trip']->id);

        $user = $this->getPassengerUser();

        $response = $this->jsonAsUser($user, ['routes' => [1, 2], 'seats' => 3]);
        $response->assertStatus(422);
    }

    /**
     * @test
     */
    public function user_cant_book_trip_if_seats_too_many()
    {
        $data = $this->createTripWithDriver();
        $this->url = $this->getUrl($data['trip']->id);

        $user = $this->getPassengerUser();

        $response = $this->jsonAsUser($user, ['routes' => [1, 2], 'seats' => 20]);
        $response->assertStatus(422);
    }

    /**
     * @test
     */
    public function user_cant_book_trip_if_seats_not_enough()
    {
        $data = $this->createTripWithDriver();
        $this->url = $this->getUrl($data['trip']->id);

        $someUser = factory(User::class)->create();
        $booking = factory(Booking::class)->create([
            'trip_id' => $data['trip']->id,
            'user_id' => $someUser->id,
            'seats' => 1,
            'status' => Booking::STATUS_APPROVED,
        ]);
        $booking->routes()->sync([1]);

        $user = $this->getPassengerUser();

        $response = $this->jsonAsUser($user, ['routes' => [1, 2], 'seats' => 2]);
        $response->assertStatus(422);
    }

    /**
     * @return array
     */
    private function createTripWithDriver()
    {
        $user = $this->getDriverUser();
        $vehicle = factory(Vehicle::class)->create(['user_id' => $user->id, 'seats' => 2]);
        $trip = factory(Trip::class)->create(['user_id' => $user->id, 'vehicle_id' => $vehicle->id]);
        $routes = factory(Route::class, 2)->create(['trip_id' => $trip->id]);

        return compact('user', 'vehicle', 'trip', 'routes');
    }
}
