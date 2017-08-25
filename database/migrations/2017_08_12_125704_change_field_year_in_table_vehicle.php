<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeFieldYearInTableVehicle extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('vehicles', function (Blueprint $table) {
            $table->dropColumn('year');
        });
        Schema::table('vehicles', function (Blueprint $table) {
            $table->integer('year')->nullable()->after('seats');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('vehicles', function (Blueprint $table) {
            $table->dropColumn('year');
        });
        Schema::table('vehicles', function (Blueprint $table) {
            $table->datetime('year')->nullable()->after('seats');
        });
    }
}
