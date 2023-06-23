<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
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
            'item_name' => fake()->name(),
            'item_slug' => fake()->unique()->safeEmail(),
            'item_description' => fake()->text(),
            'item_price' => fake()->randomFloat(2, 0, 1000),
            'item_image' => fake()->image(),
            'item_category' => fake()->numberBetween(1, 10),
        ];
    }
}
