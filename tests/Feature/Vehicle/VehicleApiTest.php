<?php

namespace Tests\Feature\Vehicle;

use App\Models\Vehicle;
use App\User;
use Tests\JwtTestCase;

class VehicleApiTest extends JwtTestCase
{
    const ENDPOINT = '/api/v1/car';

    public $storeData = [
                        'brand' => 'bmw',
                        'model' => '7',
                        'color' => 'black',
                        'body' => 'coupe',
                        'seats' => 4,
                        'year' => 2014,
                        'photo' => 'url_photo_or_path_to_file',
                         ];

    public $updateStoreData = [
                        'brand' => 'Audi',
                        'model' => 'A8',
                        'color' => 'black',
                        'body' => 'sedan',
                        'seats' => 5,
                        'year' => 2017,
                        'photo' => 'url_photo_or_path_to_file',
                         ];

    public function test_get_models_cars()
    {
        $user = factory(User::class)->create(['permissions' => User::DRIVER_PERMISSION]);

        $response = $this->actingAs($user)->json('GET', self::ENDPOINT.'-brand');
        $response->assertHeader('Content-Type', 'application/json');
        $response->assertStatus(200);
    }

    public function test_get_bodies_cars()
    {
        $user = factory(User::class)->create(['permissions' => User::DRIVER_PERMISSION]);

        $response = $this->actingAs($user)->json('GET', self::ENDPOINT.'-body');
        $response->assertHeader('Content-Type', 'application/json');
        $response->assertStatus(200);
    }

    public function test_get_color_cars()
    {
        $user = factory(User::class)->create(['permissions' => User::DRIVER_PERMISSION]);

        $response = $this->actingAs($user)->json('GET', self::ENDPOINT.'-color');
        $response->assertHeader('Content-Type', 'application/json');
        $response->assertStatus(200);
    }

    public function test_get_models_car_bmw()
    {
        $user = factory(User::class)->create(['permissions' => User::DRIVER_PERMISSION]);

        $response = $this->actingAs($user)->json('GET', self::ENDPOINT.'-brand/10/models');
        $response->assertHeader('Content-Type', 'application/json');
        $response->assertStatus(200);
    }

    public function test_get_not_exiting_models_car()
    {
        $user = factory(User::class)->create(['permissions' => User::DRIVER_PERMISSION]);

        $response = $this->actingAs($user)->json('GET', self::ENDPOINT.'-brand/99999/models');
        $response->assertStatus(404);
    }

    public function test_car_store()
    {
        $user = factory(User::class)->create(['permissions' => User::DRIVER_PERMISSION]);

        $response = $this->actingAs($user)->json('POST', self::ENDPOINT, $this->storeData);
        $response->assertHeader('Content-Type', 'application/json');
        $response->assertStatus(200);
        $response->assertJsonFragment($this->storeData);
    }

    public function test_car_get_on_index()
    {
        $user = factory(User::class)->create(['permissions' => User::DRIVER_PERMISSION]);

        $response = $this->actingAs($user)->json('POST', self::ENDPOINT, $this->storeData);
        $response = $this->actingAs($user)->json('GET', self::ENDPOINT.'/'.$response->json()['id']);
        $response->assertHeader('Content-Type', 'application/json');
        $response->assertStatus(200);
        $response->assertJsonFragment($this->storeData);
    }

    public function test_car_update()
    {
        $user = factory(User::class)->create(['permissions' => User::DRIVER_PERMISSION]);

        $response = $this->actingAs($user)->json('POST', self::ENDPOINT, $this->storeData);
        $response = $this->actingAs($user)->json('PATCH', self::ENDPOINT.'/'.$response->json()['id'], $this->updateStoreData);
        $response->assertHeader('Content-Type', 'application/json');
        $response->assertStatus(200);
        $response->assertJsonFragment($this->updateStoreData);
    }

    public function test_car_delete()
    {
        $user = factory(User::class)->create(['permissions' => User::DRIVER_PERMISSION]);
        $car = factory(Vehicle::class)->create(['user_id' => $user->id]);

        $this->actingAs($user)->json('POST', self::ENDPOINT, $this->storeData);
        $response = $this->actingAs($user)->json('DELETE', self::ENDPOINT.'/'.$car->id);
        $response->assertStatus(204);
    }

    public function test_user_no_driver_cannot_car_store()
    {
        $user = factory(User::class)->create(['permissions' => User::PASSENGER_PERMISSION]);
        factory(Vehicle::class)->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->json('POST', self::ENDPOINT, $this->storeData);
        $response->assertStatus(403);
        $response->assertSee('You have not permissions!');
    }

    public function test_wrong_method()
    {
        $user = factory(User::class)->create(['permissions' => User::DRIVER_PERMISSION]);

        $this->actingAs($user)->json('POST', self::ENDPOINT, $this->storeData);
        $response = $this->actingAs($user)->json('POST', self::ENDPOINT.'/1');
        $response->assertStatus(405);
    }

    public function test_get_not_exiting_car()
    {
        $user = factory(User::class)->create(['permissions' => User::DRIVER_PERMISSION]);

        $this->actingAs($user)->json('POST', self::ENDPOINT, $this->storeData);
        $response = $this->actingAs($user)->json('GET', self::ENDPOINT.'/9999');
        $response->assertStatus(404);
    }
}
