<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\especificaciones;

class EspecificacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        especificaciones::create(['nombre' => 'Procesador']);
        especificaciones::create(['nombre' => 'Memoria RAM']);
        especificaciones::create(['nombre' => 'Almacenamiento']);
        especificaciones::create(['nombre' => 'Pantalla']);
        especificaciones::create(['nombre' => 'Batería']);
        especificaciones::create(['nombre' => 'Cámara']);
        especificaciones::create(['nombre' => 'Peso']);
        especificaciones::create(['nombre' => 'Sistema Operativo']);
    }
}
