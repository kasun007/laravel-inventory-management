<?php

namespace App\Repositories;

 
use App\Interfaces\ItemRepositoryInterface;
use App\Models\Item;
use Illuminate\Http\Response;

class ItemRepository implements ItemRepositoryInterface
{

    public function all()
    {
        // Eager load the category and supplier relationships
        
        $items = Item::with('category', 'supplier')->paginate(12);

        // Iterate over each item and decode HTML entities for all attributes
        $items->getCollection()->transform(function ($item) {
            // Decode HTML entities for all attributes of the item
            foreach ($item->getAttributes() as $attribute => $value) {
                $item->$attribute = html_entity_decode($value);
            }

            // Check if the category is loaded and add the category_name
            if ($item->relationLoaded('category') && $item->category) {
                $item->category_name = html_entity_decode($item->category->name);
            } else {
                $item->category_name = null;
                \Log::warning('Category not loaded or missing for item', ['item_id' => $item->id]);
            }

            // Check if the supplier is loaded and add the supplier_name
            if ($item->relationLoaded('supplier') && $item->supplier) {
                $item->supplier_name = html_entity_decode($item->supplier->supplier_name);
            } else {
                $item->supplier_name = null;
                \Log::warning('Supplier not loaded or missing for item', ['item_id' => $item->id]);
            }

            // Log the item for debugging purposes
            \Log::info('Item with category and supplier', ['item' => $item]);

            return $item;
        });

        return $items;
    }

    public function get_all_items()
    {
        $item = Item::all();
        return response()->json($item, Response::HTTP_OK);
    }

    public function create(array $data)
    {
        $item = item::create($data);
        return $item;
    }

    public function update(array $data, $id){
        $item = item::find($id);
        if (!$item) {
              throw new itemNotFoundException();
        }
        $item->update($data);
        return $item;
    }

    public function delete($id)
    {
        $item = item::find($id);

        if ($item) {
            $item->delete();
            return "item deleted successfully!";
        }

        return "item not found!";
    }

    public function show($id)
    {
        $item = item::find($id);

        if ($item) {
            return response()->json(new itemResource($item), 200);
        }

        return "item not found!";
    }
}
