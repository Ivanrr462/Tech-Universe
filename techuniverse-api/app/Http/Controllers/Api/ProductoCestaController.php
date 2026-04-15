<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Producto;
use App\Models\ProductoCesta;

class ProductoCestaController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'producto_id' => 'required|exists:productos,id',
            'cantidad' => 'required|integer|min:1',
        ]);

        $user = $request->user();

        if (!$user) {
            return response()->json(['error' => 'No autenticado'], 401);
        }

        $cesta = $user->cesta;

        if (!$cesta) {
            return response()->json(['error' => 'Cesta no encontrada'], 404);
        }

        $producto = Producto::find($request->producto_id);

        $productoEnCesta = ProductoCesta::where('cesta_id', $cesta->id)
            ->where('producto_id', $request->producto_id)
            ->first();

        if ($productoEnCesta) {
            $productoEnCesta->cantidad += $request->cantidad;
            $productoEnCesta->save();
        } else {
            ProductoCesta::create([
                'cesta_id' => $cesta->id,
                'producto_id' => $request->producto_id,
                'cantidad' => $request->cantidad,
                'precio_unitario' => $producto->precio,
            ]);
        }

        return response()->json(['message' => 'Producto añadido a la cesta']);
    }

    public function update(Request $request, string $id)
    {
        $request->validate([
            'cantidad' => 'required|integer|min:1',
        ]);

        $user = $request->user();

        if (!$user) {
            return response()->json(['error' => 'No autenticado'], 401);
        }

        $cesta = $user->cesta;

        if (!$cesta) {
            return response()->json(['error' => 'Cesta no encontrada'], 404);
        }

        $productoEnCesta = ProductoCesta::where('cesta_id', $cesta->id)
            ->where('producto_id', $id)
            ->first();

        if (!$productoEnCesta) {
            return response()->json(['error' => 'Producto no encontrado en la cesta'], 404);
        }

        $productoEnCesta->cantidad = $request->cantidad;
        $productoEnCesta->save();

        return response()->json(['message' => 'Cantidad actualizada']);
    }

    public function destroy(string $id)
    {
        $user = request()->user();

        if (!$user) {
            return response()->json(['error' => 'No autenticado'], 401);
        }

        $cesta = $user->cesta;

        if (!$cesta) {
            return response()->json(['error' => 'Cesta no encontrada'], 404);
        }

        $productoEnCesta = ProductoCesta::where('cesta_id', $cesta->id)
            ->where('producto_id', $id)
            ->first();

        if (!$productoEnCesta) {
            return response()->json(['error' => 'Producto no encontrado en la cesta'], 404);
        }

        $productoEnCesta->delete();

        return response()->json(['message' => 'Producto eliminado de la cesta']);
    }
}
