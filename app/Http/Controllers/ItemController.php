<?php

namespace App\Http\Controllers;

use App\Http\Resources\ItemResource;
use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
   public function index()
   {
       return response()->json(ItemResource::collection(Item::all()));
   }
}
