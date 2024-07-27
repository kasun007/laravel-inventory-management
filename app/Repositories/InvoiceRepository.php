<?php

namespace App\Repositories;

use App\Interfaces\InvoiceRepositoryInterface;
use App\Models\Invoice;

class InvoiceRepository implements InvoiceRepositoryInterface
{
    protected $invoice;

    public function __construct(Invoice $invoice)
    {
        $this->invoice = $invoice;
    }

    public function all()
    {
        return $this->invoice->all();
    }

    public function store($request)
    {
        try {
            return $this->invoice->create($request);
        } catch (ValidationException $exception) {
            Log::error('Validation error: ' . $exception->getMessage());
            return response()->json([
                'error' => 'Validation Error',
                'message' => $exception->validator->errors()->all()
            ], 422); // HTTP status code 422 Unprocessable Entity
        } catch (QueryException $exception) {
            Log::error('Database error: ' . $exception->getMessage());
            return response()->json([
                'error' => 'Database Error',
                'message' => 'A database error occurred. Please try again later.'
            ], 500); // HTTP status code 500 Internal Server Error
        } catch (\Exception $exception) {
            Log::error('Unexpected error: ' . $exception->getMessage());
            return response()->json([
                'error' => 'Unexpected Error',
                'message' => 'An unexpected error occurred. Please try again later.'
            ], 500); // HTTP status code 500 Internal Server Error
        }
    }

    public function update(array $data, $id)
    {
        $invoice = $this->invoice->find($id);
        return $invoice->update($data);
    }

    public function delete($id)
    {
        return $this->invoice->destroy($id);
    }

    public function show($id)
    {
        return $this->invoice->find($id);
    }
}
