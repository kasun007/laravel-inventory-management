<?php

namespace App\Interfaces;
interface  InvoiceRepositoryInterface
{
    public function all();

    public function store(array $data);

    public function update(array $data, $id);

    public function delete($id);

    public function show($id);
}



?>
