<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Producto;
use App\Models\especificaciones;
use App\Models\ProductoEspecificacion;
use App\Http\Resources\ProductoEspecificacionResource;

class ProductoEspecifiacionController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'producto_id' => 'required|exists:productos,id',
            'especificacion_id' => 'required|exists:especificaciones,id',
            'valor' => 'required|string|max:255',
        ]);

        $productoPecificacion = ProductoEspecificacion::create([
            'producto_id' => $request->producto_id,
            'especificacion_id' => $request->especificacion_id,
            'valor' => $request->valor,
        ]);

        return response()->json([
            'message' => 'Especificacion añadida al producto',
            'data' => new ProductoEspecificacionResource($productoPecificacion)
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'valor' => 'required|string|max:255',
        ]);

        $productoEspecificacion = ProductoEspecificacion::find($id);

        if (!$productoEspecificacion) {
            return response()->json(['error' => 'Especificacion no encontrada en el producto'], 404);
        }

        $productoEspecificacion->valor = $request->valor;
        $productoEspecificacion->save();

        return response()->json([
            'message' => 'Especificacion actualizada',
            'data' => new ProductoEspecificacionResource($productoEspecificacion)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $productoEspecificacion = ProductoEspecificacion::find($id);

        if (!$productoEspecificacion) {
            return response()->json(['error' => 'Especificacion no encontrada'], 404);
        }

        $productoEspecificacion->delete();

        return response()->json(['message' => 'Especificacion eliminada del producto']);
    }
}
