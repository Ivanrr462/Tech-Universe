<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Producto;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;

class CestaApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_puede_ver_cesta()
    {
        $user = User::factory()->create();
        $user->cesta()->create();

        $producto = Producto::factory()->create(['precio' => 100]);
        $user->cesta->productosIngresados()->attach($producto->id, [
            'cantidad' => 2,
            'precio_unitario' => 100,
        ]);

        Sanctum::actingAs($user, ['*']);

        $response = $this->getJson('/api/cesta');

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'data' => [
                         'id',
                         'usuario',
                         'productos',
                         'precio_total',
                         'cantidad_total',
                     ]
                 ])
                 ->assertJsonFragment([
                     'precio_total' => 200,
                     'cantidad_total' => 2,
                 ]);
    }
}
