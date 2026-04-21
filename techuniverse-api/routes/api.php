<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductoController;
use App\Http\Controllers\Api\CategoriaController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\WishlistController;
use App\Http\Controllers\Api\CestaController;
use App\Http\Controllers\Api\ProductoCestaController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EspecifiacionController;
use App\Http\Controllers\Api\ProductoEspecifiacionController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Rutas públicas
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::apiResource('/productos', ProductoController::class, ['as' => 'api'])->only(['index', 'show']);
Route::get('/categoria/productos', [CategoriaController::class, 'indexProductos'])->name('api.categoria.productos');
Route::apiResource('/categoria', CategoriaController::class, ['as' => 'api'])->only(['index', 'show']);
Route::get('/especificacion/productos', [EspecifiacionController::class, 'indexProductos'])->name('api.especificacion.productos');
Route::apiResource('/especificacion', EspecifiacionController::class, ['as' => 'api'])->only(['index', 'show']);

// Rutas de usuario
Route::middleware(['auth:sanctum', 'rol:usuario'])->group(function () {
    Route::apiResource('/deseos', WishlistController::class, ['as' => 'api'])->only(['index', 'show', 'store', 'destroy']);
    Route::apiResource('/cesta', CestaController::class, ['as' => 'api'])->only(['index']);
    Route::apiResource('/cesta/productos', ProductoCestaController::class, ['as' => 'api'])->only(['update', 'store', 'destroy']);
});

// Rutas de admin
Route::middleware(['auth:sanctum', 'rol:admin'])->group(function () {
    Route::apiResource('/productos', ProductoController::class, ['as' => 'api'])->except(['index', 'show']);
    Route::apiResource('/categoria', CategoriaController::class, ['as' => 'api'])->except(['index', 'show']);
    Route::apiResource('/especificacion/productos', ProductoEspecifiacionController::class, ['as' => 'api'])->only(['store', 'update', 'destroy']);
    Route::apiResource('/especificacion', EspecifiacionController::class, ['as' => 'api'])->except(['index', 'show']);
    Route::apiResource('/usuarios', UserController::class, ['as' => 'api']);
});

Route::get('/no-autenticado', function() {
    return response()->json(['mensaje' => 'No autenticado'], 401);
});