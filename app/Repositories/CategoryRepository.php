<?php

namespace App\Repositories;

use App\Http\Resources\CategoryResource;
use App\Interfaces\CategoryRepositoryInterface;
use App\Models\Category;

class CategoryRepository implements CategoryRepositoryInterface
{

    public function all()
    {
        return Category::all();

    }

    public function create(array $data)
    {
        $category = Category::create($data);
        return response()->json(new CategoryResource($category), 201);
    }

    public function update(array $data, $id)
    {


        // If the data is valid, proceed with the update
        $category = Category::find($id);

        if ($category) {
            $category->update($data);
            return "Category updated successfully!";
        }

        return "Category not found!";


    }

    public function delete($id)
    {
        $category = Category::find($id);

        if ($category) {
            $category->delete();
            return "Category deleted successfully!";
        }

        return "Category not found!";
    }

    public function show($id)
    {
        $category = Category::find($id);

        if ($category) {
            return response()->json(new CategoryResource($category), 200);
        }

        return "Category not found!";
    }
}
