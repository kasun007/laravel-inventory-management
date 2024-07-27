<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
          \App\Models\User::factory(10)->create();
          \App\Models\Category::factory(10)->create();
          \App\Models\Item::factory(10)->create();



          $invoices = \App\Models\Invoice::factory()->count(10)->create();
          $items =  \App\Models\Item::factory()->count(50)->create();
  
          foreach ($invoices as $invoice) {
              $invoice->items()->attach(
                  $items->random(rand(1, 5))->pluck('id')->toArray(),
                  [
                      'quantity' => rand(1, 10),
                      'price' => rand(10, 100)
                  ]
              );
          }



          \App\Models\User::factory()->create([
                  'name' => 'Test User',
                  'email' => 'test@example.com',
          ]);

    }
}
