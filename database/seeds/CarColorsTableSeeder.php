<?php

use Illuminate\Database\Seeder;

class CarColorsTableSeeder extends Seeder
{
    /**
     * Auto generated seed file.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('car_colors')->delete();

        \DB::table('car_colors')->insert([
            0 => [
                'color' => 'Beige',
            ],
            1 => [
                'color' => 'Black',
            ],
            2 => [
                'color' => 'Bronze',
            ],
            3 => [
                'color' => 'Brown',
            ],
            4 => [
                'color' => 'Golden',
            ],
            5 => [
                'color' => 'Green',
            ],
            6 => [
                'color' => 'Gray',
            ],
            7 => [
                'color' => 'Orange',
            ],
            8 => [
                'color' => 'Magnolia',
            ],
            9 => [
                'color' => 'Pink',
            ],
            10 => [
                'color' => 'Purple',
            ],
            11 => [
                'color' => 'Red',
            ],
            12 => [
                'color' => 'Silver',
            ],
            13 => [
                'color' => 'White',
            ],
            14 => [
                'color' => 'Yellow',
            ],
            15 => [
                'color' => 'Blue',
            ],
            16 => [
                'color' => 'Vishnevye',
            ],
            17 => [
                'color' => 'Safari',
            ],
            18 => [
                'color' => 'Pomegranate',
            ],
            19 => [
                'color' => 'Asphalt',
            ],
        ]);
    }
}
