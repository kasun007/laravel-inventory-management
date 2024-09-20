<?php

namespace App\Http\Controllers;

use App\Http\Resources\ItemResource;
use App\Models\Item;
use Illuminate\Http\Request;
use App\Interfaces\ItemRepositoryInterface;
use Illuminate\Support\Facades\Response;


class ItemController extends Controller{



    private ItemRepositoryInterface $itemRepository;

    function __construct(ItemRepositoryInterface $itemRepository){

        $this->itemRepository = $itemRepository;
    }

    public function index(){
            
        return ItemResource::collection($this->itemRepository->all());
      
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
        ]);

        $item = Item::create($request->all());

        return response()->json($item, 201);
    }

    public function show(Item $item)
    {
        return $item;
    }


    public function get_all_items(){
        
        return $this->itemRepository->get_all_items();
    }

    public function update(Request $request, Item $item)
    {
        $request->validate([
            'name' => 'string',
            'price' => 'numeric',
        ]);

        $item->update($request->all());

        return response()->json($item, 200);
    }

    public function destroy(Item $item)
    {
        $item->delete();

        return response()->json(null, 204);
    }
}