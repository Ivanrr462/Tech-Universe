<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class DeseosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::find(2);

        if ($user) {
            // Añadir productos a la wishlist del usuario 2
            $user->deseos()->attach([5, 15, 30]);
        }
    }
}
