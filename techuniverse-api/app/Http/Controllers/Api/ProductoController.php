<?php

namespace App\Http\Controllers\Api;
use Illuminate\Support\Facades\Storage; 

use App\Http\Controllers\Controller;
use App\Models\Producto;
use App\Http\Resources\ProductoResource;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Productos",
 *     description="Gestión de productos"
 * )
 * 
 * @OA\Schema(
 *     schema="Producto",
 *     type="object",
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="nombre", type="string", example="Laptop Gaming"),
 *     @OA\Property(property="precio", type="integer", example=1500),
 *     @OA\Property(property="descripcion", type="string", nullable=true, example="Descripción del producto"),
 *     @OA\Property(property="foto", type="string", example="https://cdn.example.com/productos/laptop.jpg"),
 *     @OA\Property(
 *         property="categoria",
 *         type="object",
 *         @OA\Property(property="id", type="integer", example=2),
 *         @OA\Property(property="nombre", type="string", example="Electrónica")
 *     ),
 *     @OA\Property(
 *         property="especificaciones",
 *         type="array",
 *         @OA\Items(
 *             type="object",
 *             @OA\Property(property="id", type="integer", example=1),
 *             @OA\Property(property="nombre", type="string", example="RAM"),
 *             @OA\Property(property="valor", type="string", example="16GB")
 *         )
 *     )
 * )
 */
class ProductoController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/productos",
     *     summary="Listar todos los productos",
     *     description="Retorna una lista de todos los productos con su categoría y especificaciones",
     *     tags={"Productos"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de productos obtenida correctamente",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Producto")
     *         )
     *     )
     * )
     */
    public function index()
    {
        $productos = Producto::with('categoria', 'productoEspecificaciones.especificacion')->get();
        return ProductoResource::collection($productos);
    }

    /**
     * @OA\Post(
     *     path="/api/productos",
     *     summary="Crear un nuevo producto",
     *     description="Crea un producto nuevo con imagen subida a R2",
     *     tags={"Productos"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 required={"nombre", "precio", "categoria_id", "foto"},
     *                 @OA\Property(property="nombre", type="string", maxLength=255, example="Laptop Gaming"),
     *                 @OA\Property(property="precio", type="integer", minimum=1, example=1500),
     *                 @OA\Property(property="descripcion", type="string", maxLength=255, nullable=true, example="Descripción opcional"),
     *                 @OA\Property(property="categoria_id", type="integer", minimum=1, example=2),
     *                 @OA\Property(property="foto", type="string", format="binary", description="Imagen del producto (máx. 4MB)")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Producto creado con éxito",
     *         @OA\JsonContent(
     *             @OA\Property(property="mensaje", type="string", example="Producto creado con éxito"),
     *             @OA\Property(property="data", ref="#/components/schemas/Producto")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Error de validación",
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
            'precio' => 'required|integer|min:1',
            'descripcion' => 'nullable|string|max:255',
            'categoria_id' => 'required|integer|min:1',
            'foto' => 'required|image|max:4096',
        ]);

        $path = $request->file('foto')->store('productos', 'r2');

        $producto = Producto::create([
            'nombre' => $validated['nombre'],
            'precio' => $validated['precio'],
            'descripcion' => $validated['descripcion'],
            'categoria_id' => $validated['categoria_id'],
            'foto' => $path,
        ]);

        return response()->json([
            'mensaje' => 'Producto creado con éxito',
            'data' => new ProductoResource($producto->load('categoria', 'productoEspecificaciones.especificacion'))
        ], 201);
    }

    /**
     * @OA\Get(
     *     path="/api/productos/{id}",
     *     summary="Obtener un producto por ID",
     *     description="Retorna un producto específico con su categoría y especificaciones",
     *     tags={"Productos"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del producto",
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Producto encontrado",
     *         @OA\JsonContent(ref="#/components/schemas/Producto")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Producto no encontrado",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="No encontrado")
     *         )
     *     )
     * )
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
     * @OA\Post(
     *     path="/api/productos/{id}",
     *     summary="Actualizar un producto",
     *     description="Actualiza los datos de un producto. Se usa POST con _method=PUT por compatibilidad con multipart/form-data",
     *     tags={"Productos"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del producto a actualizar",
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 @OA\Property(property="_method", type="string", default="PUT", description="Spoofing de método HTTP"),
     *                 @OA\Property(property="nombre", type="string", maxLength=255, nullable=true, example="Laptop Pro"),
     *                 @OA\Property(property="precio", type="integer", minimum=1, nullable=true, example=2000),
     *                 @OA\Property(property="descripcion", type="string", maxLength=255, nullable=true, example="Nueva descripción"),
     *                 @OA\Property(property="categoria_id", type="integer", minimum=1, nullable=true, example=3),
     *                 @OA\Property(property="stock", type="integer", minimum=0, nullable=true, example=10),
     *                 @OA\Property(property="foto", type="string", format="binary", nullable=true, description="Nueva imagen (máx. 4MB)")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Producto actualizado correctamente",
     *         @OA\JsonContent(
     *             @OA\Property(property="mensaje", type="string", example="Actualizado correctamente"),
     *             @OA\Property(property="data", ref="#/components/schemas/Producto")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Producto no encontrado",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="No encontrado")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Error de validación",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="The precio must be an integer."),
     *             @OA\Property(property="errors", type="object")
     *         )
     *     )
     * )
     */
    public function update(Request $request, string $id)
    {
        $producto = Producto::find($id);

        if (!$producto) {
            return response()->json(['error' => 'No encontrado'], 404);
        }

        $validated = $request->validate([
            'nombre' => 'nullable|string|max:255',
            'precio' => 'nullable|integer|min:1',
            'descripcion' => 'nullable|string|max:255',
            'categoria_id' => 'nullable|integer|min:1',
            'stock' => 'nullable|integer|min:0',
            'foto' => 'nullable|image|max:4096',
        ]);

        if ($request->hasFile('foto')) {
            if ($producto->foto) {
                Storage::disk('r2')->delete($producto->foto);
            }
            $path = $request->file('foto')->store('productos', 'r2');
            $validated['foto'] = $path;
        }

        $producto->update($validated);

        return response()->json([
            'mensaje' => 'Actualizado correctamente',
            'data' => new ProductoResource(
                $producto->load('categoria', 'productoEspecificaciones.especificacion')
            )
        ], 200);
    }

    /**
     * @OA\Delete(
     *     path="/api/productos/{id}",
     *     summary="Eliminar un producto",
     *     description="Elimina un producto y su imagen del bucket R2",
     *     tags={"Productos"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del producto a eliminar",
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Producto eliminado correctamente",
     *         @OA\JsonContent(
     *             @OA\Property(property="mensaje", type="string", example="Eliminado correctamente")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Producto no encontrado",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="No encontrado")
     *         )
     *     )
     * )
     */
    public function destroy(string $id)
    {
        $producto = Producto::find($id);

        if (!$producto) {
            return response()->json(['error' => 'No encontrado'], 404);
        }

        if ($producto->foto) {
            Storage::disk('r2')->delete($producto->foto);
        }

        $producto->delete();

        return response()->json(['mensaje' => 'Eliminado correctamente'], 200);
    }
}