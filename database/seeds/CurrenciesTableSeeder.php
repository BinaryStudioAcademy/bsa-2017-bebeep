<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CurrenciesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('currencies')->delete();

        DB::table('currencies')->insert([
            [
                'code' => 'USD',
                'name' => 'Dollar',
                'rate' => 1.0000,
                'is_main' => true,
            ],
            [
                'code' => 'UAH',
                'name' => 'Hryvnia',
                'rate' => 26.1806,
            ],
            [
                'code' => 'EUR',
                'name' => 'Hryvnia',
                'rate' => 0.83797,
            ],
        ]);
    }
}
