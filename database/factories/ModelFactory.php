<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\User::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'permissions' => App\User::PASSENGER_PERMISSION,
        'first_name' => $faker->firstName,
        'last_name' => $faker->lastName,
        'phone' => str_replace('+', '', $faker->e164PhoneNumber),
        'birth_date' => $faker->date,
        'email' => $faker->unique()->safeEmail,
        'password' => $password ?: $password = bcrypt('secret'),
        'remember_token' => str_random(10),
    ];
});

$factory->define(App\Models\Vehicle::class, function (Faker\Generator $faker) {
    return [
        'brand' => $faker->company,
        'model' => $faker->unique()->word,
        'color' => $faker->safeColorName,
        'body' => $faker->word,
        'seats' => $faker->numberBetween(4, 8),
        'user_id' => 1,
    ];
});

$factory->define(App\Models\Trip::class, function (Faker\Generator $faker) {
    $start = \Carbon\Carbon::now()->addSeconds(App\Models\Trip::MIN_DELAY_TO_START_DATE);

    return [
        'price' => $faker->numberBetween(1, 1000),
        'start_at' => $start->toDateTimeString(),
        'end_at' => $start->addHour(3)->toDateTimeString(),
        'vehicle_id' => 1,
        'seats' => $faker->numberBetween(1, 3),
        'user_id' => 1,
        'is_animals_allowed' => 1,
        'luggage_size' => \App\Models\Trip::LUGGAGE_SIZE_BIG,
    ];
});

$factory->define(App\Models\Route::class, function (Faker\Generator $faker) {
    return [
        'from' => [json_decode('{"types": ["locality", "political"], "geometry": {"bounds": {"east": 30.825941000000057, "west": 30.239440100000024, "north": 50.590798, "south": 50.213273}, "location": {"lat": 50.4501, "lng": 30.52340000000004}, "viewport": {"east": 30.825941000000057, "west": 30.239440100000024, "north": 50.590798, "south": 50.213273}, "location_type": "APPROXIMATE"}, "place_id": "ChIJBUVa4U7P1EAR_kYBF9IxSXY", "formatted_address": "Киев, Украина, 02000", "address_components": [{"types": ["locality", "political"], "long_name": "Киев", "short_name": "Киев"}, {"types": ["administrative_area_level_2", "political"], "long_name": "город Киев", "short_name": "город Киев"}, {"types": ["country", "political"], "long_name": "Украина", "short_name": "UA"}, {"types": ["postal_code"], "long_name": "02000", "short_name": "02000"}]}')],
        'to' => [json_decode('{"types": ["locality", "political"], "geometry": {"bounds": {"east": 36.45581240000001, "west": 36.115837000000056, "north": 50.1053867, "south": 49.883796}, "location": {"lat": 49.9935, "lng": 36.230383000000074}, "viewport": {"east": 36.45581240000001, "west": 36.115837000000056, "north": 50.1053867, "south": 49.883796}, "location_type": "APPROXIMATE"}, "place_id": "ChIJiw-rY5-gJ0ERCr6kGmgYTC0", "formatted_address": "Харьков, Харьковская область, Украина", "address_components": [{"types": ["locality", "political"], "long_name": "Харьков", "short_name": "Харьков"}, {"types": ["administrative_area_level_3", "political"], "long_name": "Харьковский горсовет", "short_name": "Харьковский горсовет"}, {"types": ["administrative_area_level_1", "political"], "long_name": "Харьковская область", "short_name": "Харьковская область"}, {"types": ["country", "political"], "long_name": "Украина", "short_name": "UA"}]}')],
        'trip_id' => 1,
        'from_lat' => $faker->numberBetween(100, 5000) / 100.0,
        'from_lng' => $faker->numberBetween(100, 5000) / 100.0,
        'to_lat' => $faker->numberBetween(100, 5000) / 100.0,
        'to_lng' => $faker->numberBetween(100, 5000) / 100.0,
    ];
});

$factory->define(App\Models\Booking::class, function (Faker\Generator $faker) {
    return [
        'status' => App\Models\Booking::STATUS_PENDING,
        'trip_id' => 1,
        'user_id' => 1,
        'seats' => 1,
    ];
});

$factory->define(App\Models\Review::class, function (Faker\Generator $faker) {
    return [
        'comment' => $faker->text(250),
        'mark' => $faker->numberBetween(1, 5),
        'driver_id' => 1,
        'user_id' => 2,
    ];
});
