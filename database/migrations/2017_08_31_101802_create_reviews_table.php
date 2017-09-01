<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReviewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('mark');
            $table->string('comment', 250);

            $table->unsignedInteger('user_id')->index()->nullable();
            $table->foreign('user_id')->references('id')->on('users');

            $table->unsignedInteger('driver_id')->index()->nullable();
            $table->foreign('driver_id')->references('id')->on('users')->onCascade('delete');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reviews');
    }
}
