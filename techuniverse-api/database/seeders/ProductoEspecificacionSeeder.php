<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ProductoEspecificacion;

class ProductoEspecificacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Laptop Gamer ASUS TUF (id: 1)
        ProductoEspecificacion::create(['producto_id' => 1, 'especificacion_id' => 1, 'valor' => 'Intel i7 11th Gen']);
        ProductoEspecificacion::create(['producto_id' => 1, 'especificacion_id' => 2, 'valor' => '16GB DDR4']);
        ProductoEspecificacion::create(['producto_id' => 1, 'especificacion_id' => 3, 'valor' => '512GB SSD NVMe']);
        ProductoEspecificacion::create(['producto_id' => 1, 'especificacion_id' => 4, 'valor' => '15.6" FHD 144Hz']);
        ProductoEspecificacion::create(['producto_id' => 1, 'especificacion_id' => 5, 'valor' => 'Li-Po 90W']);

        // MacBook Air M1 (id: 2)
        ProductoEspecificacion::create(['producto_id' => 2, 'especificacion_id' => 1, 'valor' => 'Apple M1']);
        ProductoEspecificacion::create(['producto_id' => 2, 'especificacion_id' => 2, 'valor' => '8GB Unified']);
        ProductoEspecificacion::create(['producto_id' => 2, 'especificacion_id' => 3, 'valor' => '256GB SSD']);
        ProductoEspecificacion::create(['producto_id' => 2, 'especificacion_id' => 4, 'valor' => '13.3" Retina']);
        ProductoEspecificacion::create(['producto_id' => 2, 'especificacion_id' => 7, 'valor' => '1.24 kg']);

        // Dell XPS 13 (id: 3)
        ProductoEspecificacion::create(['producto_id' => 3, 'especificacion_id' => 1, 'valor' => 'Intel i7 12th Gen']);
        ProductoEspecificacion::create(['producto_id' => 3, 'especificacion_id' => 2, 'valor' => '16GB LPDDR5']);
        ProductoEspecificacion::create(['producto_id' => 3, 'especificacion_id' => 3, 'valor' => '512GB SSD']);
        ProductoEspecificacion::create(['producto_id' => 3, 'especificacion_id' => 4, 'valor' => '13.4" UHD+']);
        ProductoEspecificacion::create(['producto_id' => 3, 'especificacion_id' => 8, 'valor' => 'Windows 11 Pro']);

        // iPhone 14 (id: 19)
        ProductoEspecificacion::create(['producto_id' => 19, 'especificacion_id' => 1, 'valor' => 'A15 Bionic']);
        ProductoEspecificacion::create(['producto_id' => 19, 'especificacion_id' => 2, 'valor' => '6GB']);
        ProductoEspecificacion::create(['producto_id' => 19, 'especificacion_id' => 4, 'valor' => '6.1" Super Retina XDR']);
        ProductoEspecificacion::create(['producto_id' => 19, 'especificacion_id' => 5, 'valor' => 'Li-Ion 3279 mAh']);
        ProductoEspecificacion::create(['producto_id' => 19, 'especificacion_id' => 6, 'valor' => '12MP + 12MP Ultra Wide']);
        ProductoEspecificacion::create(['producto_id' => 19, 'especificacion_id' => 8, 'valor' => 'iOS 16']);

        // Samsung Galaxy S23 (id: 20)
        ProductoEspecificacion::create(['producto_id' => 20, 'especificacion_id' => 1, 'valor' => 'Snapdragon 8 Gen 2']);
        ProductoEspecificacion::create(['producto_id' => 20, 'especificacion_id' => 2, 'valor' => '8GB LPDDR5']);
        ProductoEspecificacion::create(['producto_id' => 20, 'especificacion_id' => 3, 'valor' => '256GB UFS 4.0']);
        ProductoEspecificacion::create(['producto_id' => 20, 'especificacion_id' => 4, 'valor' => '6.1" AMOLED 120Hz']);
        ProductoEspecificacion::create(['producto_id' => 20, 'especificacion_id' => 5, 'valor' => 'Li-Ion 4000 mAh']);
        ProductoEspecificacion::create(['producto_id' => 20, 'especificacion_id' => 6, 'valor' => '50MP + 12MP + 10MP']);
        ProductoEspecificacion::create(['producto_id' => 20, 'especificacion_id' => 7, 'valor' => '168g']);

        // Ryzen 7 5800X (id: 7)
        ProductoEspecificacion::create(['producto_id' => 7, 'especificacion_id' => 1, 'valor' => 'AMD Ryzen 7 5800X']);
        ProductoEspecificacion::create(['producto_id' => 7, 'especificacion_id' => 2, 'valor' => 'Soporta hasta 128GB DDR4']);

        // RTX 4060 (id: 9)
        ProductoEspecificacion::create(['producto_id' => 9, 'especificacion_id' => 1, 'valor' => 'NVIDIA RTX 4060 Ti']);
        ProductoEspecificacion::create(['producto_id' => 9, 'especificacion_id' => 2, 'valor' => '8GB GDDR6']);
        ProductoEspecificacion::create(['producto_id' => 9, 'especificacion_id' => 3, 'valor' => 'Bus PCIe 4.0 128-bit']);

        // Teclado Mecánico (id: 13)
        ProductoEspecificacion::create(['producto_id' => 13, 'especificacion_id' => 1, 'valor' => 'Mecánico']);
        ProductoEspecificacion::create(['producto_id' => 13, 'especificacion_id' => 7, 'valor' => '1.2 kg']);

        // Monitor 27" 144Hz (id: 15)
        ProductoEspecificacion::create(['producto_id' => 15, 'especificacion_id' => 4, 'valor' => '27" IPS 1440p']);
        ProductoEspecificacion::create(['producto_id' => 15, 'especificacion_id' => 7, 'valor' => '5.8 kg']);

        // Google Pixel 8 (id: 22)
        ProductoEspecificacion::create(['producto_id' => 22, 'especificacion_id' => 1, 'valor' => 'Google Tensor G3']);
        ProductoEspecificacion::create(['producto_id' => 22, 'especificacion_id' => 2, 'valor' => '12GB LPDDR5X']);
        ProductoEspecificacion::create(['producto_id' => 22, 'especificacion_id' => 3, 'valor' => '256GB UFS 3.1']);
        ProductoEspecificacion::create(['producto_id' => 22, 'especificacion_id' => 4, 'valor' => '6.3" OLED 120Hz']);
        ProductoEspecificacion::create(['producto_id' => 22, 'especificacion_id' => 5, 'valor' => 'Li-Ion 5050 mAh']);
        ProductoEspecificacion::create(['producto_id' => 22, 'especificacion_id' => 6, 'valor' => '50MP + 12MP Ultra Wide']);
        ProductoEspecificacion::create(['producto_id' => 22, 'especificacion_id' => 8, 'valor' => 'Android 14']);

        // Xiaomi Redmi Note 13 (id: 21)
        ProductoEspecificacion::create(['producto_id' => 21, 'especificacion_id' => 1, 'valor' => 'MediaTek Helio G99']);
        ProductoEspecificacion::create(['producto_id' => 21, 'especificacion_id' => 2, 'valor' => '8GB LPDDR5']);
        ProductoEspecificacion::create(['producto_id' => 21, 'especificacion_id' => 3, 'valor' => '256GB UFS 2.2']);
        ProductoEspecificacion::create(['producto_id' => 21, 'especificacion_id' => 4, 'valor' => '6.67" IPS LCD 120Hz']);
        ProductoEspecificacion::create(['producto_id' => 21, 'especificacion_id' => 5, 'valor' => 'Li-Po 5000 mAh']);
        ProductoEspecificacion::create(['producto_id' => 21, 'especificacion_id' => 6, 'valor' => '50MP + 8MP Ultra Wide']);
    }
}
