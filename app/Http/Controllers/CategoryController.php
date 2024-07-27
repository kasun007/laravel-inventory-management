<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Interfaces\CategoryRepositoryInterface;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Exceptions\CategoryNotFoundException;

class CategoryController extends Controller
{


    private CategoryRepositoryInterface $categoryRepository;

    function __construct(CategoryRepositoryInterface $categoryRepository){

        $this->categoryRepository = $categoryRepository;
    }

    public function index(){
     
        return CategoryResource::collection($this->categoryRepository->all());
    }


    public function getAllCategories()
    {
        // Fetch all categories without pagination
        $categories = $this->categoryRepository->allWithoutPagination();

        return response()->json($categories, 200);
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

    public function update(CategoryRequest $request, $category)
{
    try {
        $category = $this->categoryRepository->update($request->validated(), $category);
    } catch (CategoryNotFoundException $exception) {
        return response()->json([
            'error' => 'Category Not Found',
            'message' => $exception->getMessage()
        ], 404);
    } catch (\Illuminate\Database\QueryException $exception) {
        return response()->json([
            'error' => 'Database Error',
            'message' => $exception->getMessage()
        ], 500);
    } catch (\Exception $exception) {
        return response()->json([
            'error' => 'Unexpected Error',
            'message' => $exception->getMessage()
        ], 500);
    }
}

    public  function  destroy($id)
    {
        $category = $this->categoryRepository->delete($id);
        return response()->json($category, 200);
    }
}
