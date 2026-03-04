<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use App\Http\Resources\CategoriaResource;
use App\Http\Resources\CategoriaConProductosResource;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    /**
     * Devolver todas las categorias
     */
    public function index()
    {
        $categoria = Categoria::get();
        return CategoriaResource::collection($categoria);
    }

    /*
        Devolver todas las categorias con sus productos
    */
    public function indexProductos()
    {
        $categoria = Categoria::with('productos')->get();
        return CategoriaConProductosResource::collection($categoria);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
        ]);

        $categoria = Categoria::create($validated);

        return response()->json([
            'mensaje' => 'Categoria creada con éxito',
            'data' => new CategoriaResource($categoria)
        ], 201);
    }

    

    /**
     * Muestra una sola categoria con sus productos
     */
    public function show(string $id)
    {
        $categoria = Categoria::with('productos')->find($id);

        if (!$categoria) {
            return response()->json(['error' => 'No encontrado'], 404);
        }

        return new CategoriaConProductosResource($categoria);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $categoria = Categoria::find($id);

        if (!$categoria) {
            return response()->json(['error' => 'No encontrado'], 404);
        }

        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
        ]);

        $categoria->update($validated);

        return response()->json([
            'mensaje' => 'Actualizado correctamente',
            'data' => new CategoriaResource($categoria)
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $categoria = Categoria::find($id);

        if (!$categoria) {
            return response()->json(['error' => 'No encontrado'], 404);
        }

        $categoria->delete();

        return response()->json(['mensaje' => 'Eliminado correctamente'], 200);
    }
}
