<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\WishlistResource;
use App\Models\User;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    /**
     * Mostrar todos los usuarios con su wishlist
     */
    public function index()
    {
        $users = User::with('deseos')->get();
        
        return WishlistResource::collection($users);
    }

    /**
     * Mostrar la wishlist de un usuario específico
     */
    public function show(string $id)
    {
        $user = User::with('deseos')->find($id);

        if (!$user) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }

        return new WishlistResource($user);
    }

    /**
     * Añadir un producto a la wishlist de un usuario
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'producto_id' => 'required|exists:productos,id'
        ]);

        $user = User::find($validated['user_id']);

        if (!$user) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }

        // Añade el producto (si ya existe, no lo duplica)
        $user->deseos()->syncWithoutDetaching($validated['producto_id']);

        return response()->json([
            'mensaje' => 'Producto añadido a la wishlist',
            'data' => new WishlistResource($user->load('deseos'))
        ], 201);
    }

    /**
     * Eliminar un producto específico de la wishlist de un usuario
     */
    public function destroy(Request $request, string $productoId)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id'
        ]);

        $user = User::find($validated['user_id']);

        if (!$user) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }

        $user->deseos()->detach($productoId);

        return response()->json([
            'mensaje' => 'Producto eliminado de la wishlist'
        ], 200);
    }
}