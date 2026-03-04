<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Administrador',
            'email' => 'admin@techstore.com',
            'password' => Hash::make('admin123'),
            'rol' => 'admin',
        ]);

        User::create([
            'name' => 'Usuario Demo',
            'email' => 'usuario@techstore.com',
            'password' => Hash::make('user123'),
            'rol' => 'usuario',
        ]);
    }
}
