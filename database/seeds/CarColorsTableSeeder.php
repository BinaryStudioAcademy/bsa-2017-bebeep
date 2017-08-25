<?php

use Illuminate\Database\Seeder;

class CarColorsTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('car_colors')->delete();
        
        \DB::table('car_colors')->insert(array (
            0 => 
            array (
                'color' => 'Beige',
            ),
            1 => 
            array (
                'color' => 'Black',
            ),
            2 => 
            array (
                'color' => 'Black',
            ),
            3 => 
            array (
                'color' => 'Bronze',
            ),
            4 => 
            array (
                'color' => 'Brown',
            ),
            5 => 
            array (
                'color' => 'Golden',
            ),
            6 => 
            array (
                'color' => 'Green',
            ),
            7 => 
            array (
                'color' => 'Gray',
            ),
            8 => 
            array (
                'color' => 'Orange',
            ),
            9 => 
            array (
                'color' => 'Magnolia',
            ),
            10 => 
            array (
                'color' => 'Pink',
            ),
            11 => 
            array (
                'color' => 'Purple',
            ),
            12 => 
            array (
                'color' => 'Red',
            ),
            13 => 
            array (
                'color' => 'Silver',
            ),
            14 => 
            array (
                'color' => 'White',
            ),
            15 => 
            array (
                'color' => 'Yellow',
            ),
            16 => 
            array (
                'color' => 'Blue',
            ),
            17 => 
            array (
                'color' => 'Vishnevye',
            ),
            18 => 
            array (
                'color' => 'Safari',
            ),
            19 => 
            array (
                'color' => 'Pomegranate',
            ),
            20 => 
            array (
                'color' => 'Asphalt',
            ),
        ));
        
        
    }
}