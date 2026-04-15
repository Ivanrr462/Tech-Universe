<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\CestaResource;

class CestaController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['mensaje' => 'No autenticado'], 401);
        }

        $cesta = $user->cesta()->with('productosIngresados')->first();

        if (!$cesta) {
            return response()->json(['mensaje' => 'Cesta no encontrada'], 404);
        }

        return new CestaResource($cesta);
    }
}
