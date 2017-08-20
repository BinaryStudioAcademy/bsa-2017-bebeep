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
            $table->string('from_lat')->after('from');
            $table->string('from_lng')->after('from_lat');
            $table->string('to_lat')->after('to');
            $table->string('to_lng')->after('to_lat');

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
