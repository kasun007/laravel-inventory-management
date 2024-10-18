<?php namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    // Specify the table if it's not the plural form of the model name
    protected $table = 'items';

    // Specify the primary key if it's not 'id'
    protected $primaryKey = 'id'; // or another primary key name

    // If your table doesn't have timestamps
    public $timestamps = true; // Change to false if you don't want timestamps

    // Define fillable properties
    protected $fillable = [
        'item_name',
        'item_price',
        'item_quantity',
        'created_at',
        'item_description',
        'selling_price',
        'item_image',
        'item_category',
        'supplier_item'
        // Add other fields as needed
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
?>