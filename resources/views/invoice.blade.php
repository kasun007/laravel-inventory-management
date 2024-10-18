<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Invoice #{{ $invoice->id }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            color: #333;
        }
        .invoice-header {
            text-align: center;
            margin-bottom: 40px;
        }
        .invoice-header h1 {
            font-size: 36px;
            color: #2d3e50;
        }
        .shop-info {
            text-align: center;
            font-size: 14px;
            margin-bottom: 30px;
        }
        .shop-info h2 {
            color: #f8a22f;
        }
        .shop-info p {
            margin: 5px 0;
        }
        .invoice-details, .invoice-items {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        .invoice-details th, .invoice-details td, .invoice-items th, .invoice-items td {
            border: 1px solid #ddd;
            padding: 12px;
            font-size: 14px;
        }
        .invoice-items th {
            background-color: #f4f4f4;
            color: #333;
        }
        .text-right {
            text-align: right;
        }
        .total-row {
            font-weight: bold;
            background-color: #f1f1f1;
        }
        .footer {
            text-align: center;
            margin-top: 50px;
            font-size: 12px;
            color: #777;
        }
        .footer p {
            margin: 5px;
        }
    </style>
</head>
<body>

    <div class="shop-info">
        <h2>Art de Vivre</h2>
        <p>47 Pedler Street, Fort Galle, Sri Lanka</p>
        <p>Telephone: +94 77 123 4567</p>
        <p>Email: contact@artdevivre.com</p>
    </div>

    <div class="invoice-header">
        <h1>Invoice</h1>
        <p>Invoice #: {{ $invoice->id }}</p>
        <p>Date: {{ $invoice->created_at->format('d M Y') }}</p>
    </div>

  
    <table class="invoice-items">
        <thead>
            <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($invoice->items as $item)
                <tr>
                    <td>{{ $item->item_name }}</td>
                    <td class="text-right">{{ $item->pivot->quantity }}</td>
                    <td class="text-right">${{ number_format($item->pivot->price, 2) }}</td>
                    <td class="text-right">${{ number_format($item->pivot->price * $item->pivot->quantity, 2) }}</td>
                </tr>
            @endforeach
            <tr class="total-row">
                <td colspan="3" class="text-right">Total Amount:</td>
                <td class="text-right">${{ number_format($invoice->total_amount, 2) }}</td>
            </tr>
        </tbody>
    </table>

    <div class="footer">
        <p>Thank you for shopping with us!</p>
        <p>For any queries, feel free to contact us at <strong>contact@artdevivre.com</strong>.</p>
    </div>

</body>
</html>
