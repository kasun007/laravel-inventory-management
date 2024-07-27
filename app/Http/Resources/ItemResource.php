<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'item_name' => $this->item_name,
            'item_slug' => $this->item_slug,
            'item_description' => $this->item_description,
            'item_price' => round($this->item_price, 1), // Round price to 2 decimal places
            'item_quantity' => $this->item_quantity, // Include item quantity
            'item_image' => $this->item_image,
            'category_name' => $this->category ? $this->category->category_name : null,
            'supplier_name' => $this->supplier ? $this->supplier->supplier_name : null,
            'created_at' => $this->created_at->format('Y-m-d'), // Convert date to 'Y-m-d H:i:s' format
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'), // Convert date to 'Y-m-d H:i:s' format
            'item_category' => $this->item_category,
        ];
    }
}
