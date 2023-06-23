<?php


use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\UserController;
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

Route::middleware(['XSS','auth:sanctum'])->group(function (){

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post("/logout",[\App\Http\Controllers\Api\AuthController::class,'logout']);
    Route::apiResource("/users", UserController::class);
    Route::apiResource("/categories", CategoryController::class);
    Route::apiResource("/items",  ItemController::class);
});

Route::group(['middleware' => ['XSS']], function () {
    Route::post("/signup",[\App\Http\Controllers\Api\AuthController::class,'signup']);
    Route::post("/login",[\App\Http\Controllers\Api\AuthController::class,'login']);
});



