<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInvoiceRequest;
use App\Interfaces\InvoiceRepositoryInterface;
use App\Models\Invoice;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    private $invoiceRepository;

    public function __construct(InvoiceRepositoryInterface $invoiceRepository)
    {
        $this->invoiceRepository = $invoiceRepository;
    }

    // Get the latest invoice ID
    public function getLatestInvoiceId()
    {
        $latestId = Invoice::orderBy('id', 'desc')->value('id');

        if (!$latestId) {
            return response()->json(['error' => 'No invoices found.'], 404);
        }

        return response()->json($latestId + 1, 200);
    }

    // Get all invoices
    public function index()
    {
        return Invoice::with('items')->get();
    }

    // Store a new invoice
    public function store(StoreInvoiceRequest $request)
    {
        $invoice = $this->invoiceRepository->store($request->validated());
        return response()->json($invoice, 201);
    }

    // Show details of a specific invoice
    public function show(Invoice $invoice)
    {
        return $invoice->load('items');
    }

    // Update an existing invoice
    public function update(Request $request, Invoice $invoice)
    {
        $request->validate([
            'total_amount' => 'numeric',
            'status' => 'string',
        ]);

        $invoice->update($request->all());
        return response()->json($invoice, 200);
    }

    // Delete an invoice
    public function destroy(Invoice $invoice)
    {
        $invoice->delete();
        return response()->json(null, 204);
    }

    // Attach items to an invoice
    public function attachItems(Request $request, Invoice $invoice)
    {
        $validatedData = $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|exists:items,id',
            'items.*.price' => 'required|numeric',
            'items.*.quantity' => 'required|integer',
        ]);

        $items = collect($validatedData['items'])->mapWithKeys(function ($item) {
            return [$item['id'] => ['price' => $item['price'], 'quantity' => $item['quantity']]];
        });

        $invoice->items()->syncWithoutDetaching($items);


         
        return response()->json($invoice->load('items'), Response::HTTP_OK);
    }
}
