<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {


        return [
            'product_name' => fake()->name(),
            'product_slug' => fake()->unique()->safeEmail(),
            'product_description' => fake()->text(),
            'product_price' => fake()->randomFloat(2, 0, 1000),

            'selling_price' =>fake()->randomFloat(2, 0, 1000),
            'product_image' => fake()->image(),





            'product_category' => fake()->numberBetween(1, 10),
        ];
    }
}
