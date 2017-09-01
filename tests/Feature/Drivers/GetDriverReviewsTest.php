<?php

namespace Tests\Feature\Trips;

use App\User;
use App\Models\Review;
use Tests\JwtTestCase;

class GetDriverReviewsTest extends JwtTestCase
{
    protected $method = 'GET';
    protected $url;

    public function getUrl($id)
    {
        return route('driver.reviews', $id);
    }

    /**
     * @test
     */
    public function guest_cant_list_unexisted_driver_reviews()
    {
        $response = $this->json($this->method, $this->getUrl(1));
        $response->assertStatus(404);
    }

    /**
     * @test
     */
    public function guest_can_list_existed_driver_reviews()
    {
        $driver = $this->getDriverUser();
        $passenger = $this->getPassengerUser();
        factory(Review::class, 10)->create(['user_id' => $passenger->id, 'driver_id' => $driver->id]);

        $driver2 = $this->getDriverUser();
        factory(Review::class, 5)->create(['user_id' => $passenger->id, 'driver_id' => $driver2->id]);

        $response = $this->json($this->method, $this->getUrl(1));
        $response->assertStatus(200);

        $this->assertCount(10, $response->json()['data']);
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
