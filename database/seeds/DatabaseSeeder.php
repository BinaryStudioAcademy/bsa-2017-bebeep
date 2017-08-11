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
        // $this->call(UsersTableSeeder::class);
        $this->call(CarMarkTableSeeder::class);
        $this->call(CarModelTableSeeder::class);
        $this->call(CarBodyTableSeeder::class);
        $this->call(CarColorTableSeeder::class);
    }
}
