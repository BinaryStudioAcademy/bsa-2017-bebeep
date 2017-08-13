<?php

use Illuminate\Database\Seeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       
        $this->call(CarBodiesTableSeeder::class);
        $this->call(CarColorsTableSeeder::class);
        $this->call(CarMarksTableSeeder::class);
        $this->call(CarModelsTableSeeder::class);

        factory(App\User::class)->create();
        factory(App\Models\Vehicle::class)->create();

    }
}
