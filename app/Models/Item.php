<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;


    protected $fillable = [
        'product_name', 
        'product_description', 
        'unit_price', 
     
    ];

    public function invoice()
    {
       
        return $this->belongsToMany(Invoice::class,'invoice_items')->withPivot('quantity', 'unit_price')->withTimestamps();

    }


    public function category()
    {
        return $this->belongsTo(Category::class, 'item_category');
    }


    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'supplier_item');
    }
}
