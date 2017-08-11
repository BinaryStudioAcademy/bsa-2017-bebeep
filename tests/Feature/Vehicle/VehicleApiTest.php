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

    public function test_no_exiting_vehicle(){
        $response =  $this->json('GET', self::ENDPOINT. '/9999');
        $response->assertStatus(404);
    }

    public function test_unecessary_routes()
    {
        $response =  $this->json('POST', self::ENDPOINT . '/1');
        $response->assertStatus(405);

        $response =  $this->json('PATCH', self::ENDPOINT);
        $response->assertStatus(405);

        $response =  $this->json('DELETE', self::ENDPOINT);
        $response->assertStatus(405);
    }

    public function test_header()
    {
        $response =  $this->json('GET', self::ENDPOINT );
        $response->assertHeader('Content-Type', 'application/json');
    }

}