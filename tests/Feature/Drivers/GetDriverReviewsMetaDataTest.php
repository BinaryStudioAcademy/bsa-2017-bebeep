<?php

namespace Tests\Feature\Trips;

use App\User;
use App\Models\Review;
use Tests\JwtTestCase;

class GetDriverReviewsMetaDataTest extends JwtTestCase
{
    protected $method = 'GET';
    protected $url;

    public function getUrl($id)
    {
        return route('driver.reviews-meta', $id);
    }

    /**
     * @test
     */
    public function guest_cant_get_meta_of_unexisted_driver_reviews()
    {
        $response = $this->json($this->method, $this->getUrl(1));
        $response->assertStatus(404);
    }

    /**
     * @test
     */
    public function guest_can_get_meta_of_existed_driver_comments()
    {
        $driver = $this->getDriverUser();
        $passenger = $this->getPassengerUser();
        factory(Review::class, 10)->create(['mark' => 5, 'user_id' => $passenger->id, 'driver_id' => $driver->id]);
        factory(Review::class, 5)->create(['mark' => 4, 'user_id' => $passenger->id, 'driver_id' => $driver->id]);
        factory(Review::class, 3)->create(['mark' => 3, 'user_id' => $passenger->id, 'driver_id' => $driver->id]);

        $response = $this->json($this->method, $this->getUrl($driver->id));
        $response->assertStatus(200);

        $response->assertJson([
            0 => 0,
            1 => 0,
            2 => 3,
            3 => 5,
            4 => 10,
        ]);
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
