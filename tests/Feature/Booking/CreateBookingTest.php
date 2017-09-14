<?php

namespace Tests\Feature\Trips;

use App\User;
use Carbon\Carbon;
use App\Models\Trip;
use App\Models\Route;
use Tests\JwtTestCase;
use App\Models\Booking;
use App\Models\Vehicle;

class CreateBookingTest extends JwtTestCase
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
    public function driver_cant_create_booking()
    {
        $data = $this->createTripWithDriver();
        $this->url = $this->getUrl($data['trip']->id);
        $user = $this->getDriverUser();

        $response = $this->jsonRequestAsUser($user, $this->method, $this->url, []);
        $response->assertStatus(403);
    }

    /**
     * @test
     */
    public function user_can_not_create_trip_if_not_all_fields_is_filled()
    {
        $data = $this->createTripWithDriver();
        $this->url = $this->getUrl($data['trip']->id);

        $user = $this->getPassengerUser();

        $response = $this->jsonRequestAsUser($user, $this->method, $this->url, []);
        $response->assertStatus(422);

        $response = $this->jsonRequestAsUser($user, $this->method, $this->url, ['seats' => null, 'routes' => [1, 2]]);
        $response->assertStatus(422)->assertJsonStructure(['seats' => []]);

        $response = $this->jsonRequestAsUser($user, $this->method, $this->url, ['routes' => null, 'seats' => 1]);
        $response->assertStatus(422)->assertJsonStructure(['routes' => []]);
    }

    /**
     * @test
     */
    public function driver_cant_book_for_self_trip()
    {
        $data = $this->createTripWithDriver();
        $this->url = $this->getUrl($data['trip']->id);

        $response = $this->jsonRequestAsUser($data['user'], $this->method, $this->url, ['routes' => [1, 2], 'seats' => 3]);
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

        $response = $this->jsonRequestAsUser($user, $this->method, $this->url, ['routes' => [3, 2], 'seats' => 3]);
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

        $response = $this->jsonRequestAsUser($user, $this->method, $this->url, ['routes' => [1, 2], 'seats' => 3]);
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

        $response = $this->jsonRequestAsUser($user, $this->method, $this->url, ['routes' => [1, 2], 'seats' => 20]);
        $response->assertStatus(422);
    }

    /**
     * @test
     */
    public function user_cant_book_trip_if_seats_not_enough()
    {
        $data = $this->createTripWithDriver();
        $this->url = $this->getUrl($data['trip']->id);
        $routeIds = $data['trip']->routes->pluck('id')->toArray();

        $someUser = factory(User::class)->create();
        $booking = factory(Booking::class)->create([
            'trip_id' => $data['trip']->id,
            'user_id' => $someUser->id,
            'seats' => 1,
        ]);
        $booking->update(['status' => Booking::STATUS_APPROVED]);
        $booking->routes()->sync([$routeIds[0]]);

        $user = $this->getPassengerUser();

        $response = $this->jsonRequestAsUser($user, $this->method, $this->url, ['routes' => $routeIds, 'seats' => 2]);
        $response->assertStatus(422);
    }

    /**
     * @test
     */
    public function user_cant_book_trip_if_he_is_already_booked_for_this_trip()
    {
        $data = $this->createTripWithDriver();
        $this->url = $this->getUrl($data['trip']->id);
        $routeIds = $data['trip']->routes->pluck('id')->toArray();

        $user = $this->getPassengerUser();

        $booking = factory(Booking::class)->create([
            'trip_id' => $data['trip']->id,
            'user_id' => $user->id,
            'seats' => 1,
        ]);
        $booking->routes()->sync([$routeIds[0]]);

        $response = $this->jsonRequestAsUser($user, $this->method, $this->url, ['routes' => [$routeIds[0]], 'seats' => 1]);
        $response->assertStatus(422);
    }

    /**
     * @test
     */
    public function user_can_book_trip()
    {
        $data = $this->createTripWithDriver();
        $this->url = $this->getUrl($data['trip']->id);
        $route1 = $data['routes'][0]->id;
        $route2 = $data['routes'][1]->id;

        $user = $this->getPassengerUser();

        $response = $this->jsonRequestAsUser(
            $user,
            $this->method,
            $this->url,
            [
                'routes' => [$route1, $route2],
                'seats' => 1,
            ]
        );
        $response->assertStatus(200);

        $this->assertDatabaseHas('booking_route', [
            'route_id' => $route1,
            'booking_id' => $response->json()['id'],
        ]);
        $this->assertDatabaseHas('booking_route', [
            'route_id' => $route2,
            'booking_id' => $response->json()['id'],
        ]);

        $this->assertDatabaseHas('bookings', [
            'trip_id' => $data['trip']->id,
            'user_id' => $user->id,
            'status' => Booking::STATUS_PENDING,
            'seats' => 1,
        ]);
    }

    /**
     * @test
     */
    public function user_can_book_trip_if_at_least_one_seat_in_route_is_free()
    {
        $data = $this->createTripWithDriver();
        $this->url = $this->getUrl($data['trip']->id);

        $user1 = $this->getPassengerUser();
        $user2 = $this->getPassengerUser();

        $route1 = $data['routes'][0]->id;
        $route2 = $data['routes'][1]->id;

        $booking = factory(Booking::class)->create([
            'trip_id' => $data['trip']->id,
            'user_id' => $user1->id,
            'seats' => 2,
        ]);
        $booking->routes()->sync($route1);

        $this->assertDatabaseHas('bookings', [
            'trip_id' => $data['trip']->id,
            'user_id' => $user1->id,
            'status' => Booking::STATUS_PENDING,
            'seats' => 2,
        ]);

        $response = $this->jsonRequestAsUser(
            $user2,
            $this->method,
            $this->url,
            [
                'routes' => [$route2],
                'seats' => 2,
            ]
        );

        $response->assertStatus(200);

        $this->assertDatabaseHas('bookings', [
            'trip_id' => $data['trip']->id,
            'user_id' => $user2->id,
            'status' => Booking::STATUS_PENDING,
            'seats' => 2,
        ]);
    }

    /**
     * @return array
     */
    private function createTripWithDriver()
    {
        $user = $this->getDriverUser();
        $vehicle = factory(Vehicle::class)->create(['user_id' => $user->id, 'seats' => 2]);
        $trip = factory(Trip::class)->create(['user_id' => $user->id, 'vehicle_id' => $vehicle->id, 'seats' => 2]);
        $routes = factory(Route::class, 2)->create(['trip_id' => $trip->id]);

        return compact('user', 'vehicle', 'trip', 'routes');
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
