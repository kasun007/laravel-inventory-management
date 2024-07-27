<?php
 
namespace App\Interfaces;
use App\Interfaces\ItemRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;


interface SupplierRepositoryInterface
{
    public function all();

    public function withOutPagination();

    public function show($id);

    public function create(array $data);

    public function update(int $id, array $data): bool;

    public function delete(int $id): bool;
}