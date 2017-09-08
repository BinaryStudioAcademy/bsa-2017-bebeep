<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSubscriptionTripTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subscription_trip', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('subscription_id')->index()->nullable();
            $table->foreign('subscription_id')->references('id')->on('subscriptions')->onDelete('cascade');

            $table->unsignedInteger('trip_id')->index()->nullable();
            $table->foreign('trip_id')->references('id')->on('trips')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('subscription_trip');
    }
}
