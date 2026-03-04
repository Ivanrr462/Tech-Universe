<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\CestaResource;

class CestaController extends Controller
{
    public function index()
    {
        $user = User::find(1);
        $cesta = $user->cesta()->with('productosIngresados')->first();

        $precio_total = $cesta->productosIngresados->sum(function ($producto) {
            return $producto->pivot->precio_unitario * $producto->pivot->cantidad;
        });

        $cantidad_total = $cesta->productosIngresados->sum(function ($producto) {
            return $producto->pivot->cantidad;
        });

        return new CestaResource($cesta);
    }
}
