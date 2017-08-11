<?php

use Illuminate\Database\Seeder;

class CarBodyTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('car_body')->delete();
        
        \DB::table('car_body')->insert(array (
            0 => 
            array (
                'id' => 1,
                'body' => 'Hatchback',
            ),
            1 => 
            array (
                'id' => 2,
                'body' => 'Sedan',
            ),
            2 => 
            array (
                'id' => 3,
                'body' => 'Cabriolete',
            ),
            3 => 
            array (
                'id' => 4,
                'body' => 'Universal',
            ),
            4 => 
            array (
                'id' => 5,
                'body' => 'Crossover',
            ),
            5 => 
            array (
                'id' => 6,
                'body' => 'Family',
            ),
            6 => 
            array (
                'id' => 7,
                'body' => 'Minivan',
            ),
            7 => 
            array (
                'id' => 8,
                'body' => 'Minibus',
            ),
        ));
        
        
    }
}