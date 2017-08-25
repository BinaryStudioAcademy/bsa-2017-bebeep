<?php

use Illuminate\Database\Seeder;

class CarBodiesTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('car_bodies')->delete();
        
        \DB::table('car_bodies')->insert(array (
            0 => 
            array (
                'body' => 'Hatchback',
            ),
            1 => 
            array (
                'body' => 'Sedan',
            ),
            2 => 
            array (
                'body' => 'Cabriolete',
            ),
            3 => 
            array (
                'body' => 'Universal',
            ),
            4 => 
            array (
                'body' => 'Crossover',
            ),
            5 => 
            array (
                'body' => 'Family',
            ),
            6 => 
            array (
                'body' => 'Minivan',
            ),
            7 => 
            array (
                'body' => 'Minibus',
            ),
        ));
        
        
    }
}