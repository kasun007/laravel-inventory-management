<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Interfaces\CategoryRepositoryInterface;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class CategoryController extends Controller
{


    private CategoryRepositoryInterface $categoryRepository;

    function __construct(CategoryRepositoryInterface $categoryRepository){

        $this->categoryRepository = $categoryRepository;
    }

    public function index()
    {
        return CategoryResource::collection($this->categoryRepository->all());
    }

    public function store(CategoryRequest $request)
    {
        $category = $this->categoryRepository->create($request->validated());
        return response()->json(new CategoryResource($category), 201);
    }


    public function show($id)
    {
        $category = $this->categoryRepository->show($id);
        return response()->json(new CategoryResource($category), 200);
    }

    public  function  update(CategoryRequest $request, $id)
    {
        $category = $this->categoryRepository->update($request->validated(), $id);
        return response()->json(new CategoryResource($category), 200);
    }

    public  function  destroy($id)
    {
        $category = $this->categoryRepository->delete($id);
        return response()->json($category, 200);
    }
}
