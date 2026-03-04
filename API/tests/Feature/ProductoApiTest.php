<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Producto;
use App\Models\Categoria;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ProductoApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_puede_listar_productos()
    {
        Producto::factory()->count(3)->create();

        $response = $this->getJson('/api/productos');

        $response->assertStatus(200)
                 ->assertJsonCount(3, 'data');
    }

    public function test_puede_mostrar_un_producto()
    {
        $producto = Producto::factory()->create();

        $response = $this->getJson("/api/productos/{$producto->id}");

        $response->assertStatus(200)
                 ->assertJsonStructure(['data']);
    }

    public function test_devuelve_404_si_producto_no_existe()
    {
        $response = $this->getJson('/api/productos/999');

        $response->assertStatus(404);
    }

    public function test_puede_crear_un_producto()
    {
        $categoria = Categoria::factory()->create();

        $data = [
            'nombre' => 'Teclado Mecánico',
            'precio' => 120,
            'descripcion' => 'Teclado RGB',
            'categoria_id' => $categoria->id,
        ];

        $response = $this->postJson('/api/productos', $data);

        $response->assertStatus(201)
                 ->assertJsonFragment([
                     'mensaje' => 'Producto creado con éxito'
                 ]);

        $this->assertDatabaseHas('productos', [
            'nombre' => 'Teclado Mecánico'
        ]);
    }

    public function test_puede_actualizar_un_producto()
    {
        $producto = Producto::factory()->create();

        $data = [
            'nombre' => 'Producto Actualizado',
            'precio' => 200,
            'descripcion' => 'Nueva descripcion',
            'categoria_id' => $producto->categoria_id,
            'stock' => 10,
        ];

        $response = $this->putJson("/api/productos/{$producto->id}", $data);

        $response->assertStatus(200)
                 ->assertJsonFragment([
                     'mensaje' => 'Actualizado correctamente'
                 ]);

        $this->assertDatabaseHas('productos', [
            'nombre' => 'Producto Actualizado'
        ]);
    }

    public function test_puede_eliminar_un_producto()
    {
        $producto = Producto::factory()->create();

        $response = $this->deleteJson("/api/productos/{$producto->id}");

        $response->assertStatus(200);

        $this->assertDatabaseMissing('productos', [
            'id' => $producto->id
        ]);
    }
}