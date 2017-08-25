<?php

use Illuminate\Database\Seeder;

class CarBodiesTableSeeder extends Seeder
{
    /**
     * Auto generated seed file.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('car_bodies')->delete();

        \DB::table('car_bodies')->insert([
            0 => [
                'body' => 'Hatchback',
            ],
            1 => [
                'body' => 'Sedan',
            ],
            2 => [
                'body' => 'Cabriolete',
            ],
            3 => [
                'body' => 'Universal',
            ],
            4 => [
                'body' => 'Crossover',
            ],
            5 => [
                'body' => 'Family',
            ],
            6 => [
                'body' => 'Minivan',
            ],
            7 => [
                'body' => 'Minibus',
            ],
        ]);
    }
}
