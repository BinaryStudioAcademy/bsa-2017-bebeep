<?php

use Carbon\Carbon;
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
                'name' => 'US Dollar',
                'sign' => '\u0024',
                'rate' => 1.0000,
                'is_main' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'code' => 'UAH',
                'name' => 'Ukrainian Hryvnia',
                'sign' => '\u20B4',
                'rate' => 26.1450,
                'is_main' => false,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'code' => 'EUR',
                'name' => 'Euro',
                'sign' => '\u20AC',
                'rate' => 0.8369,
                'is_main' => false,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
