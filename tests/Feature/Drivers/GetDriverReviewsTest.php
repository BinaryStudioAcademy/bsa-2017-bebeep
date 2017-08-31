<?php

namespace Tests\Feature\Trips;

use App\User;
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
    public function guest_cant_list_unexisted_driver_comments()
    {
        $response = $this->json($this->method, $this->getUrl(1));
        $response->assertStatus(404);
    }

    /**
     * @test
     */
    public function guest_can_list_existed_driver_comments()
    {
        $this->getDriverUser();

        $response = $this->json($this->method, $this->getUrl(1));
        $response->assertStatus(200);
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
