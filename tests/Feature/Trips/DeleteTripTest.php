<?php

namespace Tests\Feature\Trips;

use App\Models\Trip;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class DeleteTripTest extends TestCase
{
    use DatabaseMigrations, DatabaseTransactions;

    private $url = 'api/trip/delete';

    public function user_can_not_delete_trip_if_trip_id_is_not_correct()
    {
        $response = $this->json('DELETE', $this->url, ['id' => null]);
        $response->assertStatus(422)->assertJsonStructure(['id' => []]);

        $response = $this->json('DELETE', $this->url, ['id' => 5]);
        $response->assertStatus(404);
    }

    public function user_can_delete_trip()
    {
        $response = $this->json('DELETE', $this->url, ['id' => 1]);
        $response->assertStatus(200);

        $this->assertDatabaseMissing('trips', ['id' => 1]);
        $this->assertDatabaseMissing('routes', ['trip_id' => 1]);
    }

    /**
     * @test
     * Add a test to check if the user has driver permissions
     */
    public function user_can_not_delete_trip_without_driver_permissions(){}

    /**
     * @test
     * Add a test to check if a trip haven't passengers
     */
    public function user_can_not_delete_trip_with_passengers(){}

}
