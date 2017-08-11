<?php

use Illuminate\Database\Seeder;

class CarColorTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('car_color')->delete();
        
        \DB::table('car_color')->insert(array (
            0 => 
            array (
                'id' => 1,
                'color' => 'Beige',
            ),
            1 => 
            array (
                'id' => 2,
                'color' => 'Black',
            ),
            2 => 
            array (
                'id' => 3,
                'color' => 'Black',
            ),
            3 => 
            array (
                'id' => 4,
                'color' => 'Bronze',
            ),
            4 => 
            array (
                'id' => 5,
                'color' => 'Brown',
            ),
            5 => 
            array (
                'id' => 6,
                'color' => 'Golden',
            ),
            6 => 
            array (
                'id' => 7,
                'color' => 'Green',
            ),
            7 => 
            array (
                'id' => 8,
                'color' => 'Gray',
            ),
            8 => 
            array (
                'id' => 9,
                'color' => 'Orange',
            ),
            9 => 
            array (
                'id' => 10,
                'color' => 'Magnolia',
            ),
            10 => 
            array (
                'id' => 11,
                'color' => 'Pink',
            ),
            11 => 
            array (
                'id' => 12,
                'color' => 'Purple',
            ),
            12 => 
            array (
                'id' => 13,
                'color' => 'Red',
            ),
            13 => 
            array (
                'id' => 14,
                'color' => 'Silver',
            ),
            14 => 
            array (
                'id' => 15,
                'color' => 'White',
            ),
            15 => 
            array (
                'id' => 16,
                'color' => 'Yellow',
            ),
            16 => 
            array (
                'id' => 17,
                'color' => 'Blue',
            ),
            17 => 
            array (
                'id' => 18,
                'color' => 'Vishnevye',
            ),
            18 => 
            array (
                'id' => 19,
                'color' => 'Safari',
            ),
            19 => 
            array (
                'id' => 20,
                'color' => 'Pomegranate',
            ),
            20 => 
            array (
                'id' => 21,
                'color' => 'Asphalt',
            ),
        ));
        
        
    }
}