<?php

namespace App\Repositories;
use App\Interfaces\SupplierRepositoryInterface;
use App\Models\Supplier;
use Illuminate\Database\Eloquent\Collection;

class SupplierRepository implements SupplierRepositoryInterface{
    public function all()
    {
        return Supplier::paginate(10);
    }

   
   public function withOutPagination()
    {
        return Supplier::all();
    }
  

    public function  show($id)
    {
        return Supplier::find($id);
    }

    public function create(array $data): Supplier
    {
        return Supplier::create($data);
    }

    public function update(int $id, array $data): bool
    {
        return Supplier::find($id)->update($data);
    }

    public function delete(int $id): bool
    {
        return Supplier::destroy($id);
    }
    
     
}