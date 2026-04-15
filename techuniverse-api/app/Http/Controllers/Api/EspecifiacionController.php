<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\especificaciones;
use App\Http\Resources\EspecificacionResource;
use App\Http\Resources\EspecificacionConProductosResource;
use Illuminate\Http\Request;

class EspecifiacionController extends Controller
{
    /**
     * Devolver todas las especificaciones
     */
    public function index()
    {
        $especificaciones = especificaciones::get();
        return response()->json([
            'data' => EspecificacionResource::collection($especificaciones)
        ]);
    }

    /**
     * Devolver todas las especificaciones con sus productos
     */
    public function indexProductos()
    {
        $especificaciones = especificaciones::with('productoEspecificaciones.producto')->get();
        return response()->json([
            'data' => EspecificacionConProductosResource::collection($especificaciones)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
        ]);

        $especificacion = especificaciones::create($validated);

        return response()->json([
            'mensaje' => 'Especificacion creada con éxito',
            'data' => new EspecificacionResource($especificacion)
        ], 201);
    }

    /**
     * Muestra una sola especificacion con sus productos
     */
    public function show(string $id)
    {
        $especificacion = especificaciones::with('productoEspecificaciones.producto')->find($id);

        if (!$especificacion) {
            return response()->json(['error' => 'No encontrado'], 404);
        }

        return response()->json([
            'data' => new EspecificacionConProductosResource($especificacion)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $especificacion = especificaciones::find($id);

        if (!$especificacion) {
            return response()->json(['error' => 'No encontrado'], 404);
        }

        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
        ]);

        $especificacion->update($validated);

        return response()->json([
            'mensaje' => 'Actualizado correctamente',
            'data' => new EspecificacionResource($especificacion)
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $especificacion = especificaciones::find($id);

        if (!$especificacion) {
            return response()->json(['error' => 'No encontrado'], 404);
        }

        $especificacion->delete();

        return response()->json(['mensaje' => 'Eliminado correctamente'], 200);
    }
}
