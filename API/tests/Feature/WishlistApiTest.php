<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Producto;
use Illuminate\Foundation\Testing\RefreshDatabase;

class WishlistApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_puede_listar_wishlists()
    {
        $users = User::factory()
            ->count(2)
            ->has(Producto::factory()->count(2), 'deseos')
            ->create();

        $response = $this->getJson('/api/deseos');

        $response->assertStatus(200)
                 ->assertJsonCount(2, 'data');
    }

    public function test_puede_mostrar_wishlist_de_un_usuario()
    {
        $user = User::factory()
            ->has(Producto::factory()->count(3), 'deseos')
            ->create();

        $response = $this->getJson("/api/deseos/{$user->id}");

        $response->assertStatus(200)
                 ->assertJsonStructure(['data']);
    }

    public function test_devuelve_404_si_usuario_no_existe()
    {
        $response = $this->getJson('/api/deseos/999');

        $response->assertStatus(404);
    }

    public function test_puede_añadir_producto_a_wishlist()
    {
        $user = User::factory()->create();
        $producto = Producto::factory()->create();

        $response = $this->postJson('/api/deseos', [
            'user_id' => $user->id,
            'producto_id' => $producto->id
        ]);

        $response->assertStatus(201)
                 ->assertJsonFragment([
                     'mensaje' => 'Producto añadido a la wishlist'
                 ]);

        $this->assertDatabaseHas('producto_user', [
            'user_id' => $user->id,
            'producto_id' => $producto->id
        ]);
    }

    public function test_puede_eliminar_producto_de_wishlist()
    {
        $user = User::factory()->create();
        $producto = Producto::factory()->create();

        $user->deseos()->attach($producto->id);

        $response = $this->deleteJson("/api/deseos/{$producto->id}", [
            'user_id' => $user->id
        ]);

        $response->assertStatus(200)
                 ->assertJsonFragment([
                     'mensaje' => 'Producto eliminado de la wishlist'
                 ]);

        $this->assertDatabaseMissing('producto_user', [
            'user_id' => $user->id,
            'producto_id' => $producto->id
        ]);
    }
}