<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnsForCoordinateFromToRoutesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('routes', function (Blueprint $table) {
            $table->decimal('from_lat', 10, 8)->after('from');
            $table->decimal('from_lng', 11, 8)->after('from_lat');
            $table->decimal('to_lat', 10, 8)->after('to');
            $table->decimal('to_lng', 11, 8)->after('to_lat');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('routes', function (Blueprint $table) {
            $table->dropColumn('from_lat');
            $table->dropColumn('from_lng');
            $table->dropColumn('to_lat');
            $table->dropColumn('to_lng');
        });
    }
}
