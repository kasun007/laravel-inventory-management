<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Supplier;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Item>
 */
class ItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    
    {
        return [
            'item_name' => $this->faker->word,
            'item_description' => $this->faker->sentence,
            'item_price' => fake()->randomFloat(2, 0, 1000),
            'item_quantity' => fake()->numberBetween(1, 100),
            'selling_price' =>fake()->randomFloat(2, 0, 1000),
            'item_image' => fake()->image(),
            'item_category' => fake()->numberBetween(1, 10),
            'supplier_item' => Supplier::factory(),


        ];
    }
}
