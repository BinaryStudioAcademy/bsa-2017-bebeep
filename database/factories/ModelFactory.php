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
        'first_name' => $faker->name,
        'last_name' => $faker->name,
        'phone' => str_replace("+", "", $faker->e164PhoneNumber),
        'birth_date' => $faker->date,
        'email' => $faker->unique()->safeEmail,
        'password' => $password ?: $password = bcrypt('secret'),
        'remember_token' => str_random(10),
    ];
});


$factory->define(App\Models\Vehicle::class, function (Faker\Generator $faker) {
    return [
        'brand' => $faker->name,
        'model' => $faker->unique()->randomLetter,
        'color' => $faker->safeColorName,
        'body' => $faker->text(50),

        'seats' => $faker->numberBetween(1,6),
        'user_id' => 1
    ];
});

$factory->define(App\Models\Trip::class, function (Faker\Generator $faker) {
    return [
        'price' => $faker->randomFloat(),
        'start_at' => $faker->dateTime(),
        'end_at' => $faker->dateTimeBetween('now', '+3 hour'),
        'vehicle_id' => 1,
        'user_id' => 1
    ];
});

$factory->define(App\Models\Route::class, function (Faker\Generator $faker) {
    return [
        'from' => ['a'],
        'to'=> ['b'],
        'trip_id' =>1
    ];
});

$factory->define(App\Models\Booking::class, function (Faker\Generator $faker) {
    return [
        'status'=> 'active',
        'trip_id' => 1,
        'user_id' => 1
    ];
});
