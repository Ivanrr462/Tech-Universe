<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Usuario::create([
            'nombre' => 'Administrador',
            'email' => 'admin@techstore.com',
            'contrasena' => Hash::make('admin123'),
            'rol' => 'admin',
        ]);

        Usuario::create([
            'nombre' => 'Usuario Demo',
            'email' => 'usuario@techstore.com',
            'contrasena' => Hash::make('user123'),
            'rol' => 'usuario',
        ]);
    }
}
