<?php

namespace Tests\Feature\Vehicle;

use Tests\TestCase;

class VehicleApiTest extends TestCase
{
    const ENDPOINT = 'api/v1/car';

    /**
     * test index
     */
    public function test_index(){
        $response =  $this->json('GET', self::ENDPOINT);
        $response->assertStatus(200);
    }
}