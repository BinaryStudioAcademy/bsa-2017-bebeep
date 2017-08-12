<?php

namespace Tests\Feature\Vehicle;

use App\User;

use Tests\JwtTestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class VehicleApiTest extends JwtTestCase
{
    use DatabaseMigrations, DatabaseTransactions;

    const ENDPOINT = '/api/v1/car';
    const DATE = '2014-01-01';

    public $storeData = [
                        "brand" => "bmw",
                        "model" => "7",
                        "color" => "black",
                        "body" => "coupe",
                        "seats" => 4,
                        "year" => 2014,
                        "photo" => "url_photo_or_path_to_file"
                         ];

    public $updateStoreData = [
                        "brand" => "Audi",
                        "model" => "A8",
                        "color" => "black",
                        "body" => "sedan",
                        "seats" => 5,
                        "year" => 2017,
                        "photo" => "url_photo_or_path_to_file"
                         ];

    /**
     * test index
     */
//    public function test_get_marks_cars(){
//        $user = factory(User::class)->create();
//        $response = $this->actingAs($user)->json('GET', self::ENDPOINT.'Mark');
//        $response->assertHeader('Content-Type', 'application/json');
//        $response->assertStatus(200);
//    }
//
//    public function test_get_bodies_cars(){
//        $user = factory(User::class)->create();
//        $response = $this->actingAs($user)->json('GET', self::ENDPOINT.'Body');
//        $response->assertHeader('Content-Type', 'application/json');
//        $response->assertStatus(200);
//    }
//
//    public function test_get_color_cars(){
//        $user = factory(User::class)->create();
//        $response = $this->actingAs($user, 2)->json('GET', self::ENDPOINT.'Color');
////        $response = $this->actingAs($user)->call('GET', self::ENDPOINT.'Color');
//        $response->assertHeader('Content-Type', 'application/json');
//        $response->assertStatus(200);
//    }
//
//    public function test_get_models_car_bmw(){
//        $user = factory(User::class)->create();
//        $response = $this->actingAs($user)->json('GET', self::ENDPOINT.'Model/10');
//
//        $response->assertHeader('Content-Type', 'application/json');
//        $response->assertStatus(200);
//    }
//
//    public function test_get_not_exiting_models_car(){
//        $user = factory(User::class)->create();
//        $response = $this->actingAs($user)->json('GET', self::ENDPOINT.'Model/999999');
//        $response->assertStatus(404);
//    }

    public function test_car_store(){
        $user = factory(User::class)->create(['permissions' => User::DRIVER_PERMISSION]);

        $response = $this->actingAs($user)->json('POST', self::ENDPOINT, $this->storeData);
        $response->assertHeader('Content-Type', 'application/json');
        $response->assertStatus(200);
        $response->assertJsonFragment($this->storeData);
    }

//    public function test_car_get_on_index(){
//        $user = factory(User::class)->create();
//        $response = $this->actingAs($user)->json('GET', self::ENDPOINT.'/1');
////        $response->assertHeader('Content-Type', 'application/json');
//        $response->assertStatus(200);
//        $response->assertJsonFragment($this->storeData);
//    }
//
//    public function test_car_update(){
//        $user = factory(User::class)->create();
//        $response = $this->actingAs($user)->json('PATCH', self::ENDPOINT.'/1', $this->updateStoreData);
////        $response->assertHeader('Content-Type', 'application/json');
//        $response->assertStatus(200);
//        $response->assertJsonFragment($this->updateStoreData);
//    }
}