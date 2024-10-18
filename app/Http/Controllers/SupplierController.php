<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\SupplierRepository;
use App\Repositories\SupplierRepositoryInterface;
use App\Http\Requests\SupplierRequest;
use App\Http\Resources\SupplierResource;
use Illuminate\Http\Response;


class SupplierController extends Controller
{
    private $supplierRepository;

    public function __construct(SupplierRepository $supplierRepository)
    {
        $this->supplierRepository = $supplierRepository;
    }

    public function index()
    {
        return SupplierResource::collection($this->supplierRepository->all());
    }

    public function show($id)
    {
        return new SupplierResource($this->supplierRepository->getById($id));
    }
    
    public function store(SupplierRequest $request) {

        
    

        
        $supplier = $this->supplierRepository->create($request->validated());
      return  ray($supplier);
      
      //  return \response(new SupplierResource($supplier), Response::HTTP_CREATED);
   

      
    }

    public function update(Request $request, $id)
    {
        $data = $request->all();
        return $this->supplierRepository->update($id, $data);
    }

    public function destroy($id)
    {
        return $this->supplierRepository->delete($id);
    }   


    public function showAll()
    {
        return  response()->json($this->supplierRepository->withOutPagination());
        
        
        
        
    }

}
