<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Mostrar todos los usuarios
     */
    public function index()
    {
        $usuario = User::get();
        return UserResource::collection($usuario);
    }

    /**
     * Store a newly created user in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        // Añadimos el rol por defecto
        $validated['rol'] = 'usuario';

        // Encriptamos la contraseña
        $validated['password'] = Hash::make($validated['password']);

        $usuario = User::create($validated);

        return response()->json([
            'mensaje' => 'Usuario creado con éxito',
            'data' => new UserResource($usuario)
        ], 201);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $usuario = User::find($id);

        if (!$usuario) {
            return response()->json(['error' => 'No encontrado'], 404);
        }

        return new UserResource($usuario);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $usuario = User::find($id);

        // sometimes significa que lo actualiza si viene en la petición
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $id,
            'password' => 'sometimes|string|min:6',
            'role' => 'sometimes|string|in:usuario,admin'
        ]);

        // Si viene password, la encriptamos
        if ($request->filled('password')) {
            $validated['password'] = Hash::make($request->password);
        }

        $usuario->update($validated);

        return response()->json([
            'mensaje' => 'Usuario actualizado con éxito',
            'data' => new UserResource($usuario)
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $usuario = User::find($id);

        if (!$usuario) {
            return response()->json(['error' => 'No encontrado'], 404);
        }

        $usuario->delete();

        return response()->json(['mensaje' => 'Eliminado correctamente'], 200);
    }
}
