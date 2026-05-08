<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@techstore.com'],
            [
                'name' => 'Administrador',
                'password' => Hash::make('admin123'),
                'rol' => 'admin',
            ]
        );

        User::updateOrCreate(
            ['email' => 'usuario@techstore.com'],
            [
                'name' => 'Usuario Demo',
                'password' => Hash::make('user123'),
                'rol' => 'usuario',
            ]
        );
    }
}
