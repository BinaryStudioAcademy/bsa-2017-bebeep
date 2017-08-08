<?php

namespace Tests\Feature\Trips;

use App\Models\Trip;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class UpdateTripTest extends TestCase
{
    use DatabaseMigrations, DatabaseTransactions;

    private $url = 'api/trip/update';

    /**
     * @test
     */
    public function user_can_not_update_trip_if_not_all_fields_is_filled()
    {
        $response = $this->json('PATCH', $this->url, []);
        $response->assertStatus(422);

        $response = $this->json('PATCH', $this->url,
            factory(Trip::class)->make(['id' => null])->toArray());
        $response->assertStatus(422)->assertJsonStructure(['id' => []]);

        $response = $this->json('PATCH', $this->url,
            factory(Trip::class)->make(['price' => null])->toArray());
        $response->assertStatus(422)->assertJsonStructure(['price' => []]);

        $response = $this->json('PATCH', $this->url,
            factory(Trip::class)->make(['start_at' => null])->toArray());
        $response->assertStatus(422)->assertJsonStructure(['start_at' => []]);

        $response = $this->json('PATCH', $this->url,
            factory(Trip::class)->make(['end_at' => null])->toArray());
        $response->assertStatus(422)->assertJsonStructure(['end_at' => []]);

        $response = $this->json('PATCH', $this->url,
            factory(Trip::class)->make(['vehicle_id' => null])->toArray());
        $response->assertStatus(422)->assertJsonStructure(['vehicle_id' => []]);

        $response = $this->json('PATCH', $this->url,
            array_merge(factory(Trip::class)->make()->toArray()), ['from' => null]);
        $response->assertStatus(422)->assertJsonStructure(['from' => []]);

        $response = $this->json('PATCH', $this->url,
            array_merge(factory(Trip::class)->make()->toArray()), ['to' => null]);
        $response->assertStatus(422)->assertJsonStructure(['to' => []]);
    }

    /**
     * @test
     */
    public function user_can_not_update_trip_with_wrong_data()
    {
        $response = $this->json('PATCH', $this->url,
            factory(Trip::class)->make([
                'start_at' => str_random(10)
            ])->toArray());
        $response->assertStatus(422);

        $response = $this->json('PATCH', $this->url,
            factory(Trip::class)->make([
                'end_at' => str_random(10)
            ])->toArray());
        $response->assertStatus(422);

        $response = $this->json('PATCH', $this->url,
            factory(Trip::class)->make([
                'start_at' => date('Y-m-d H:i:s', strtotime("-1 hour"))
            ])->toArray());
        $response->assertStatus(422);

        $response = $this->json('PATCH', $this->url,
            factory(Trip::class)->make([
                'end_at' => date("Y-m-d H:i:s"),
                'start_at' => date('Y-m-d H:i:s', strtotime("+1 days"))
            ])->toArray());
        $response->assertStatus(422);
    }

    /**
     * @test
     * Add a test to check if the user has driver permissions
     */
    public function user_can_not_update_trip_without_driver_permissions(){}
}
