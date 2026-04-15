<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Categoria;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Categoria::create(['nombre' => 'Portátiles']);
        Categoria::create(['nombre' => 'Componentes']);
        Categoria::create(['nombre' => 'Periféricos']);
        Categoria::create(['nombre' => 'Smartphones']);
        Categoria::create(['nombre' => 'Accesorios']);
    }
}
