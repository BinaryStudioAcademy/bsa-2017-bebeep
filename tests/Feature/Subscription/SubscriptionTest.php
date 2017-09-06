<?php

namespace Tests\Feature\Subscription;

use Tests\JwtTestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class SubscriptionTest extends JwtTestCase
{
    use DatabaseMigrations, DatabaseTransactions;

    const ENDPOINT = '/api/v1/subscription';

    public $storeData = [
        "start_point" => [
            "from"=>["from"=>"Стара Вижівка"],
            "from_lat"=>51.4373666,
            "from_lng"=>24.436656099999936
        ],
        "end_point"=>[
            "to"=>["to"=>"Лісняки"],
            "to_lat"=>51.3519444,
            "to_lng"=>24.415277800000013
        ],
        "filters"=>[
            ["id"=>"1","name"=>"filter_name","parameters"=>["from"=>"Стара Вижівка"]],
            ["id"=>"2","name"=>"filter_name_two","parameters"=>["from"=>"Лісняки"]]
        ],
        "start_at"=>12345,
        "email"=>"mail@mail.com"
    ];

    public $fragmentData = [
        "from"=>["from"=>"Стара Вижівка"],
        "from_lat"=>51.4373666,
        "from_lng"=>24.436656099999936,
        "to"=>["to"=>"Лісняки"],
        "to_lat"=>51.3519444,
        "to_lng"=>24.415277800000013,
    ];

    public function test_car_store()
    {
        $response = $this->json('POST', self::ENDPOINT, $this->storeData);
        $response->assertHeader('Content-Type', 'application/json');
        $response->assertStatus(200);
        $response->assertJsonFragment($this->fragmentData);
    }
}