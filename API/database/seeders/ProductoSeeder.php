<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Producto;

class ProductoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Portátiles (categoria_id = 1)
        Producto::create(['nombre' => 'Laptop Gamer ASUS TUF', 'precio' => 1200, 'stock' => 10, 'descripcion' => 'Portátil gaming con RTX y 16GB RAM', 'categoria_id' => 1]);
        Producto::create(['nombre' => 'MacBook Air M1', 'precio' => 999, 'stock' => 8, 'descripcion' => 'Ultrabook ligero y potente', 'categoria_id' => 1]);
        Producto::create(['nombre' => 'Dell XPS 13', 'precio' => 1100, 'stock' => 5, 'descripcion' => 'Portátil premium para productividad', 'categoria_id' => 1]);
        Producto::create(['nombre' => 'HP Pavilion 15', 'precio' => 750, 'stock' => 12, 'descripcion' => 'Portátil equilibrado para estudio y trabajo', 'categoria_id' => 1]);
        Producto::create(['nombre' => 'Lenovo Legion 5', 'precio' => 1300, 'stock' => 6, 'descripcion' => 'Gaming con alto rendimiento térmico', 'categoria_id' => 1]);
        Producto::create(['nombre' => 'Acer Aspire 5', 'precio' => 650, 'stock' => 15, 'descripcion' => 'Portátil económico para uso diario', 'categoria_id' => 1]);

        // Componentes (categoria_id = 2)
        Producto::create(['nombre' => 'Ryzen 7 5800X', 'precio' => 320, 'stock' => 20, 'descripcion' => 'Procesador 8 núcleos alto rendimiento', 'categoria_id' => 2]);
        Producto::create(['nombre' => 'Intel i5 12600K', 'precio' => 280, 'stock' => 18, 'descripcion' => 'CPU ideal para gaming y multitarea', 'categoria_id' => 2]);
        Producto::create(['nombre' => 'RTX 4060 8GB', 'precio' => 450, 'stock' => 9, 'descripcion' => 'Tarjeta gráfica última generación', 'categoria_id' => 2]);
        Producto::create(['nombre' => 'SSD NVMe 1TB', 'precio' => 120, 'stock' => 25, 'descripcion' => 'Almacenamiento ultra rápido', 'categoria_id' => 2]);
        Producto::create(['nombre' => 'RAM DDR4 16GB', 'precio' => 75, 'stock' => 40, 'descripcion' => 'Memoria para multitarea fluida', 'categoria_id' => 2]);
        Producto::create(['nombre' => 'Placa Base B550', 'precio' => 140, 'stock' => 14, 'descripcion' => 'Compatible con Ryzen', 'categoria_id' => 2]);

        // Periféricos (categoria_id = 3)
        Producto::create(['nombre' => 'Teclado Mecánico RGB', 'precio' => 90, 'stock' => 30, 'descripcion' => 'Switches mecánicos y retroiluminación', 'categoria_id' => 3]);
        Producto::create(['nombre' => 'Mouse Gamer Logitech G502', 'precio' => 65, 'stock' => 22, 'descripcion' => 'Alta precisión para gaming', 'categoria_id' => 3]);
        Producto::create(['nombre' => 'Monitor 27\" 144Hz', 'precio' => 280, 'stock' => 10, 'descripcion' => 'Pantalla fluida para juegos', 'categoria_id' => 3]);
        Producto::create(['nombre' => 'Auriculares HyperX', 'precio' => 85, 'stock' => 16, 'descripcion' => 'Sonido envolvente gaming', 'categoria_id' => 3]);
        Producto::create(['nombre' => 'Webcam Full HD', 'precio' => 55, 'stock' => 18, 'descripcion' => 'Ideal para streaming y videollamadas', 'categoria_id' => 3]);
        Producto::create(['nombre' => 'Alfombrilla XL', 'precio' => 20, 'stock' => 50, 'descripcion' => 'Superficie amplia para gaming', 'categoria_id' => 3]);

        // Smartphones (categoria_id = 4)
        Producto::create(['nombre' => 'iPhone 14', 'precio' => 999, 'stock' => 7, 'descripcion' => 'Smartphone premium Apple', 'categoria_id' => 4]);
        Producto::create(['nombre' => 'Samsung Galaxy S23', 'precio' => 950, 'stock' => 9, 'descripcion' => 'Pantalla AMOLED y cámara avanzada', 'categoria_id' => 4]);
        Producto::create(['nombre' => 'Xiaomi Redmi Note 13', 'precio' => 320, 'stock' => 20, 'descripcion' => 'Gran calidad precio', 'categoria_id' => 4]);
        Producto::create(['nombre' => 'Google Pixel 8', 'precio' => 890, 'stock' => 6, 'descripcion' => 'Android puro y gran cámara', 'categoria_id' => 4]);
        Producto::create(['nombre' => 'OnePlus 11', 'precio' => 780, 'stock' => 8, 'descripcion' => 'Rendimiento flagship', 'categoria_id' => 4]);
        Producto::create(['nombre' => 'Motorola Edge 40', 'precio' => 520, 'stock' => 11, 'descripcion' => 'Diseño premium y ligero', 'categoria_id' => 4]);

        // Accesorios (categoria_id = 5)
        Producto::create(['nombre' => 'Cargador USB-C 65W', 'precio' => 35, 'stock' => 40, 'descripcion' => 'Carga rápida universal', 'categoria_id' => 5]);
        Producto::create(['nombre' => 'Power Bank 20000mAh', 'precio' => 50, 'stock' => 28, 'descripcion' => 'Batería portátil alta capacidad', 'categoria_id' => 5]);
        Producto::create(['nombre' => 'Soporte para Laptop', 'precio' => 30, 'stock' => 25, 'descripcion' => 'Mejora ergonomía y ventilación', 'categoria_id' => 5]);
        Producto::create(['nombre' => 'Hub USB 7 puertos', 'precio' => 45, 'stock' => 19, 'descripcion' => 'Expansión de conectividad', 'categoria_id' => 5]);
        Producto::create(['nombre' => 'Cable HDMI 2.1', 'precio' => 18, 'stock' => 60, 'descripcion' => 'Soporte 4K / 8K', 'categoria_id' => 5]);
        Producto::create(['nombre' => 'Mochila para portátil', 'precio' => 55, 'stock' => 17, 'descripcion' => 'Protección y transporte seguro', 'categoria_id' => 5]);
    }
}
