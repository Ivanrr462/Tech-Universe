<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Producto>
 */
class ProductoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre' => $this->faker->word(),
            'precio' => $this->faker->numberBetween(10, 1000),
            'descripcion' => $this->faker->sentence(),
            'categoria_id' => \App\Models\Categoria::factory(),
            'stock' => $this->faker->numberBetween(0, 50),
        ];
    }
}
