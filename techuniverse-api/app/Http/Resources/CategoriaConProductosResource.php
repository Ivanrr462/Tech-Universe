<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

// Recurso para mostrar las categorias con los prodcutos
class CategoriaConProductosResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'productos' => $this->productos->map(function ($producto) {
                return [
                    'id' => $producto->id,
                    'nombre' => $producto->nombre,
                    'precio' => $producto->precio,
                    'stock' => $producto->stock,
                    'descripcion' => $producto->descripcion,
                    'creado' => $producto->created_at->format('Y-m-d H:i:s'),
                    'foto' => $producto->foto
                        ? env('R2_PUBLIC_URL').'/'.$producto->foto
                        : 'https://pub-45ac6957fba64f04a0f8a0fd40292c60.r2.dev/productos/dvEcf0VxtjxaHq3yAHBw9uQr4CW4keFw3GFAUvqa.jpg',
                ];
            }),
        ];
    }
}
