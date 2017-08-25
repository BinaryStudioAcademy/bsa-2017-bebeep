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
                'color' => 'Black',
            ],
            3 => [
                'color' => 'Bronze',
            ],
            4 => [
                'color' => 'Brown',
            ],
            5 => [
                'color' => 'Golden',
            ],
            6 => [
                'color' => 'Green',
            ],
            7 => [
                'color' => 'Gray',
            ],
            8 => [
                'color' => 'Orange',
            ],
            9 => [
                'color' => 'Magnolia',
            ],
            10 => [
                'color' => 'Pink',
            ],
            11 => [
                'color' => 'Purple',
            ],
            12 => [
                'color' => 'Red',
            ],
            13 => [
                'color' => 'Silver',
            ],
            14 => [
                'color' => 'White',
            ],
            15 => [
                'color' => 'Yellow',
            ],
            16 => [
                'color' => 'Blue',
            ],
            17 => [
                'color' => 'Vishnevye',
            ],
            18 => [
                'color' => 'Safari',
            ],
            19 => [
                'color' => 'Pomegranate',
            ],
            20 => [
                'color' => 'Asphalt',
            ],
        ]);
    }
}
