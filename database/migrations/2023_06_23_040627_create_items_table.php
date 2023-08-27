<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->bigInteger("id")->autoIncrement();
            $table->timestamps();
            $table->string('item_name', 1000);
            $table->string('item_slug', 1000);
            $table->string('item_description', 1000);
            $table->string('item_price', 1000);
            $table->string('item_image', 1000);
            $table->bigInteger('item_category');
            $table->foreign('item_category')->references('id')->on('categories');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('item');
    }
};
