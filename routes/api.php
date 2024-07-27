<?php


use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\SupplierController ;
use App\Http\Middleware\RoleCheckMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware(['XSS','auth:sanctum' ,RoleCheckMiddleware::class . ':admin'])->group(function (){

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource("users", UserController::class);
    Route::apiResource("categories",CategoryController::class);
    Route::apiResource("items",    ItemController::class);
    Route::apiResource("invoices", InvoiceController::class);
    Route::apiResource("suppliers", SupplierController::class);
    Route::get("supplier-show-all", [SupplierController::class,"showAll"]);
    Route::get("get-all-catogeries", [CategoryController::class,'getAllCategories']);
    // Route to attach items to an invoice
    Route::post('invoices/{invoice}/items', [InvoiceController::class, 'attachItems']);
    Route::get('invoice-latest', [InvoiceController::class, 'getLatestInvoiceId']);
    Route::get('item-all', [ItemController::class, 'get_all_items']);
});



Route::post("/logout",[\App\Http\Controllers\Api\AuthController::class,'logout']);

Route::group(['middleware' => ['XSS']], function () {
    Route::post("/signup",[\App\Http\Controllers\Api\AuthController::class,'signup']);
    Route::post("/login",[\App\Http\Controllers\Api\AuthController::class,'login']);
});



