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
        Schema::create('categories', function (Blueprint $table) {
            $table->bigInteger("id")->autoIncrement();
            $table->string('category_name', 10000);
            $table->string('category_slug', 100);
            $table->string('category_description', 1000);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();



        });

        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        
      
        if (Schema::hasTable('products')) {
            // Use raw SQL to drop the foreign key constraint
            DB::statement('ALTER TABLE products DROP CONSTRAINT IF EXISTS products_product_category_foreign');
        }

        // Use raw SQL to drop the categories table with CASCADE
        DB::statement('DROP TABLE IF EXISTS categories CASCADE');

    
      
        
    }
};
