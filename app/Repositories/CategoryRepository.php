<?php

namespace App\Repositories;

use App\Http\Resources\CategoryResource;
use App\Interfaces\CategoryRepositoryInterface;
use App\Models\Category;
use App\Exceptions\CategoryNotFoundException;
class CategoryRepository implements CategoryRepositoryInterface
{

    public function all()
    {


        $categories = Category::paginate(12);

        // Iterate over each category and decode HTML entities for all attributes
        $categories->getCollection()->transform(function ($category) {
            foreach ($category->getAttributes() as $attribute => $value) {
                $category->$attribute = html_entity_decode($value);
            }

            return $category;
        });

        return $categories;

    }



    function allWithoutPagination()
    {
        return Category::all();
    }

    public function create(array $data)
    {
        $category = Category::create($data);
        return $category;
    }

    public function update(array $data, $id){
        $category = Category::find($id);
        if (!$category) {
              throw new CategoryNotFoundException();
        }
        $category->update($data);
        return $category;
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
