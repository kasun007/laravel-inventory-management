<?php

namespace App\Interfaces;
   
interface ItemRepositoryInterface
{
    public function all();
    public function create(array $data);
    public function update(array $data, $id);
    public function delete($id);
    public function show($id);
    public function get_all_items();
}

?>