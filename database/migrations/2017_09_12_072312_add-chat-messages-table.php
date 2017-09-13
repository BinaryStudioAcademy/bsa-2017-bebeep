<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddChatMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chat_messages', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('sender_id')->index()->nullable();
            $table->foreign('sender_id')->references('id')->on('users')->onDelete('cascade');

            $table->unsignedInteger('recipient_id')->index()->nullable();
            $table->foreign('recipient_id')->references('id')->on('users')->onDelete('cascade');

            $table->string('message')->text();
            $table->boolean('is_read')->default(false);

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('chat_messages');
    }
}
