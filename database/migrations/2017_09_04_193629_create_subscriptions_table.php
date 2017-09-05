<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSubscriptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->increments('id');

            $table->datetime('start_at');
            $table->json('from');
            $table->decimal('from_lat', 10, 8);
            $table->decimal('from_lng', 11, 8);
            $table->json('to');
            $table->decimal('to_lat', 10, 8);
            $table->decimal('to_lng', 11, 8);
            $table->string('email', 255);
            $table->boolean('is_active')->default(true);

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
        Schema::dropIfExists('subscriptions');
    }
}
