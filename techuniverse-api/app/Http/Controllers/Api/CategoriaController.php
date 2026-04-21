<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use App\Http\Resources\CategoriaResource;
use App\Http\Resources\CategoriaConProductosResource;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Categorias",
 *     description="Gestion de categorias"
 * )
 *
 * @OA\Schema(
 *     schema="Categoria",
 *     type="object",
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="nombre", type="string", example="Electronica")
 * )
 *
 * @OA\Schema(
 *     schema="CategoriaConProductos",
 *     type="object",
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="nombre", type="string", example="Electronica"),
 *     @OA\Property(
 *         property="productos",
 *         type="array",
 *         @OA\Items(ref="#/components/schemas/Producto")
 *     )
 * )
 */
class CategoriaController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/categorias",
     *     summary="Listar todas las categorias",
     *     description="Retorna una lista de todas las categorias",
     *     tags={"Categorias"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de categorias obtenida correctamente",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Categoria")
     *         )
     *     )
     * )
     */
    public function index()
    {
        $categoria = Categoria::get();
        return CategoriaResource::collection($categoria);
    }

    /**
     * @OA\Get(
     *     path="/api/categorias/productos",
     *     summary="Listar todas las categorias con sus productos",
     *     description="Retorna una lista de todas las categorias incluyendo sus productos",
     *     tags={"Categorias"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de categorias con productos obtenida correctamente",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/CategoriaConProductos")
     *         )
     *     )
     * )
     */
    public function indexProductos()
    {
        $categoria = Categoria::with('productos')->get();
        return CategoriaConProductosResource::collection($categoria);
    }

    /**
     * @OA\Post(
     *     path="/api/categorias",
     *     summary="Crear una nueva categoria",
     *     description="Crea una nueva categoria",
     *     tags={"Categorias"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nombre"},
     *             @OA\Property(property="nombre", type="string", maxLength=255, example="Electronica")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Categoria creada con exito",
     *         @OA\JsonContent(
     *             @OA\Property(property="mensaje", type="string", example="Categoria creada con exito"),
     *             @OA\Property(property="data", ref="#/components/schemas/Categoria")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Error de validacion",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="The nombre field is required."),
     *             @OA\Property(property="errors", type="object")
     *         )
     *     )
     * )
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
     * @OA\Get(
     *     path="/api/categorias/{id}",
     *     summary="Obtener una categoria por ID",
     *     description="Retorna una categoria especifica con sus productos",
     *     tags={"Categorias"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de la categoria",
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Categoria encontrada",
     *         @OA\JsonContent(ref="#/components/schemas/CategoriaConProductos")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Categoria no encontrada",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="No encontrado")
     *         )
     *     )
     * )
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
     * @OA\Put(
     *     path="/api/categorias/{id}",
     *     summary="Actualizar una categoria",
     *     description="Actualiza el nombre de una categoria existente",
     *     tags={"Categorias"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de la categoria a actualizar",
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nombre"},
     *             @OA\Property(property="nombre", type="string", maxLength=255, example="Informatica")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Categoria actualizada correctamente",
     *         @OA\JsonContent(
     *             @OA\Property(property="mensaje", type="string", example="Actualizado correctamente"),
     *             @OA\Property(property="data", ref="#/components/schemas/Categoria")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Categoria no encontrada",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="No encontrado")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Error de validacion",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="The nombre field is required."),
     *             @OA\Property(property="errors", type="object")
     *         )
     *     )
     * )
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
     * @OA\Delete(
     *     path="/api/categorias/{id}",
     *     summary="Eliminar una categoria",
     *     description="Elimina una categoria por su ID",
     *     tags={"Categorias"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de la categoria a eliminar",
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Categoria eliminada correctamente",
     *         @OA\JsonContent(
     *             @OA\Property(property="mensaje", type="string", example="Eliminado correctamente")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Categoria no encontrada",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="No encontrado")
     *         )
     *     )
     * )
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