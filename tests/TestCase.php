<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    protected static $migrationsRun = false;

    public function setUp()
    {
        parent::setUp();

        if (! static::$migrationsRun) {
            \Artisan::call('migrate:refresh');
            $this->seed('CarBodiesTableSeeder');
            $this->seed('CarColorsTableSeeder');
            $this->seed('CarBrandsTableSeeder');
            $this->seed('CarModelsTableSeeder');
            $this->seed('CurrenciesTableSeeder');
            static::$migrationsRun = true;
        }

        \DB::beginTransaction();
    }

    public function tearDown()
    {
        \DB::rollBack();
        parent::tearDown();
    }
}
