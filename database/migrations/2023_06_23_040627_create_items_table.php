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
        Schema::create('products', function (Blueprint $table) {
            $table->bigInteger("id")->autoIncrement();
            $table->timestamps();
            $table->string('product_name', 1000);
            $table->string('product_slug', 1000);
            $table->string('product_description', 1000);
            $table->string('product_price', 1000);
            $table->string('selling_price', 1000);


            $table->string('product_image', 1000);
            $table->bigInteger('product_category');
            $table->foreign('product_category')->references('id')->on('categories');
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
