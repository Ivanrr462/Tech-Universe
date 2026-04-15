<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Producto;
use App\Http\Resources\ProductoResource;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $productos = Producto::with('categoria', 'productoEspecificaciones.especificacion')->get();
        return ProductoResource::collection($productos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'precio' => 'required|integer|min:1',
            'descripcion' => 'required|string|max:255', //mirar como poner que no sea required y poner valor por defecto
            'categoria_id' => 'required|integer|min:1',
        ]);

        $productos = Producto::create($validated);

        return response()->json([
            'mensaje' => 'Producto creado con éxito',
            'data' => new ProductoResource($productos->load('categoria', 'productoEspecificaciones.especificacion'))
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $producto = Producto::with('categoria', 'productoEspecificaciones.especificacion')->find($id);

        if (!$producto) {
            return response()->json(['error' => 'No encontrado'], 404);
        }

        return new ProductoResource($producto);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $producto = Producto::find($id);

        if (!$producto) {
            return response()->json(['error' => 'No encontrado'], 404);
        }

        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'precio' => 'required|integer|min:1',
            'descripcion' => 'required|string|max:255', //mirar como poner que no sea required y poner valor por defecto
            'categoria_id' => 'required|integer|min:1',
            'stock' => 'integer|min:0',
        ]);

        $producto->update($validated);

        return response()->json([
            'mensaje' => 'Actualizado correctamente',
            'data' => new ProductoResource($producto->load('categoria', 'productoEspecificaciones.especificacion'))
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $producto = Producto::find($id);

        if (!$producto) {
            return response()->json(['error' => 'No encontrado'], 404);
        }

        $producto->delete();

        return response()->json(['mensaje' => 'Eliminado correctamente'], 200);
    }
}
