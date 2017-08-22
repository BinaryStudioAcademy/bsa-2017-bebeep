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
    return [
        'price' => $faker->numberBetween(1, 1000),
        'start_at' => \Carbon\Carbon::now()->toDateTimeString(),
        'end_at' => \Carbon\Carbon::now()->addHour(3)->toDateTimeString(),
        'vehicle_id' => 1,
        'seats' => $faker->numberBetween(1, 3),
        'user_id' => 1,
    ];
});

$factory->define(App\Models\Route::class, function (Faker\Generator $faker) {
    return [
        'from' => ['a'],
        'to' => ['b'],
        'trip_id' => 1,
    ];
});

$factory->define(App\Models\Booking::class, function (Faker\Generator $faker) {
    return [
        'status' => App\Models\Booking::STATUS_PENDING,
        'trip_id' => 1,
        'user_id' => 1,
        'seats' => 1
    ];
});
