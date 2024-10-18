<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInvoiceRequest;

namespace App\Http\Controllers;

use App\Http\Requests\StoreInvoiceRequest;
use App\Interfaces\InvoiceRepositoryInterface;
use App\Models\Invoice;
use Illuminate\Http\Request;
use PDF;
use Illuminate\Support\Facades\Response;

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
            return response()->json(1, 200);
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
        // generatePdf($invoice);
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
        \Log::info('Request Data:', $request->all());

        $validatedData = $request->validate([
            'invoiceItems.items' => 'required|array',
            'invoiceItems.items.*.id' => 'required|exists:items,id',
            'invoiceItems.items.*.price' => 'required|numeric',
            'invoiceItems.items.*.quantity' => 'required|integer',
        ]);

        $items = collect($validatedData['invoiceItems']['items'])->mapWithKeys(function ($item) {
            return [$item['id'] => ['price' => $item['price'], 'quantity' => $item['quantity']]];
        });

        $invoice->items()->syncWithoutDetaching($items);
        $this->generatePdf($invoice);

        return response()->json($invoice, 200);
    }

   
    // Generate a PDF for an invoice
   

public function generatePdf(Invoice $invoice)
{

    \Log::info('Generating PDF for Invoice:', [
        'invoice_id' => $invoice->id,
        'customer_id' => $invoice->customer_id,
        'total_amount' => $invoice->total_amount,
        'items' => $invoice->items->toArray()
    ]);
   
        // Calculate total amount
       

        // Load related items for the invoice
        $invoice->load('items');

        // Generate PDF using the 'invoices.pdf' Blade view
        $pdf = PDF::loadView('invoice',compact('invoice'));
        // Define the path where the PDF will be saved
        $path = storage_path('app/public/invoices/invoice_' . $invoice->id . '.pdf');

        
        // Save the PDF to the defined path
        $pdf->save($path);
        
        // Optionally, you can return a response indicating success
        return response()->json([
            'message' => 'Invoice PDF generated and saved successfully.',
            'path' => $path
        ]);
        

   
        // Log the error for debugging
       
    
}
}
 