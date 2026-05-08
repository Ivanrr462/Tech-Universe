<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoriaController;
use App\Http\Controllers\Api\CestaController;
use App\Http\Controllers\Api\EspecifiacionController;
use App\Http\Controllers\Api\ProductoCestaController;
use App\Http\Controllers\Api\ProductoController;
use App\Http\Controllers\Api\ProductoEspecifiacionController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\WishlistController;

/*
|--------------------------------------------------------------------------
| Usuario autenticado
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/*
|--------------------------------------------------------------------------
| Auth
|--------------------------------------------------------------------------
*/
Route::post('/register', [AuthController::class, 'register'])->name('api.auth.register');
Route::post('/login', [AuthController::class, 'login'])->name('api.auth.login');
Route::post('/logout', [AuthController::class, 'logout'])
    ->middleware('auth:sanctum')
    ->name('api.auth.logout');

/*
|--------------------------------------------------------------------------
| PÚBLICO
|--------------------------------------------------------------------------
*/
Route::name('api.')->group(function () {

    Route::get('productos/count', [ProductoController::class, 'count'])->name('productos.count');
    Route::apiResource('productos', ProductoController::class)->only(['index', 'show']);

    Route::get('categoria/productos', [CategoriaController::class, 'indexProductos'])->name('categoria.productos');
    Route::apiResource('categoria', CategoriaController::class)->only(['index', 'show']);

    Route::get('especificacion/productos', [EspecifiacionController::class, 'indexProductos'])->name('especificacion.productos');
    Route::apiResource('especificacion', EspecifiacionController::class)->only(['index', 'show']);
});

/*
|--------------------------------------------------------------------------
| USUARIO
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'rol:usuario'])
    ->name('api.usuario.')
    ->group(function () {

        Route::apiResource('deseos', WishlistController::class)->only(['show', 'store', 'destroy']);
        Route::apiResource('cesta', CestaController::class)->only(['index']);
        Route::apiResource('cesta/productos', ProductoCestaController::class)
            ->only(['store', 'update', 'destroy']);
    });

/*
|--------------------------------------------------------------------------
| ADMIN (SIN CONFLICTOS)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'rol:admin'])
    ->group(function () {

        Route::apiResource('usuarios', UserController::class)
            ->names('api.admin.usuarios');

        Route::apiResource('deseos', WishlistController::class)
            ->only(['index'])
            ->names([
                'index' => 'api.admin.deseos.index',
            ]);

        Route::apiResource('productos', ProductoController::class)
            ->except(['index', 'show'])
            ->names([
                'store' => 'api.admin.productos.store',
                'update' => 'api.admin.productos.update',
                'destroy' => 'api.admin.productos.destroy',
            ]);

        Route::apiResource('categoria', CategoriaController::class)
            ->except(['index', 'show'])
            ->names([
                'store' => 'api.admin.categoria.store',
                'update' => 'api.admin.categoria.update',
                'destroy' => 'api.admin.categoria.destroy',
            ]);

        Route::apiResource('especificacion', EspecifiacionController::class)
            ->except(['index', 'show'])
            ->names([
                'store' => 'api.admin.especificacion.store',
                'update' => 'api.admin.especificacion.update',
                'destroy' => 'api.admin.especificacion.destroy',
            ]);

        Route::apiResource('especificacion/productos', ProductoEspecifiacionController::class)
            ->only(['store', 'update', 'destroy'])
            ->names([
                'store' => 'api.admin.especificacion.productos.store',
                'update' => 'api.admin.especificacion.productos.update',
                'destroy' => 'api.admin.especificacion.productos.destroy',
            ]);
    });

/*
|--------------------------------------------------------------------------
| No autenticado
|--------------------------------------------------------------------------
*/
Route::get('/no-autenticado', function () {
    return response()->json(['mensaje' => 'No autenticado'], 401);
});