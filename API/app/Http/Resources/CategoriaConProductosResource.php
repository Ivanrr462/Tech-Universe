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
                    'nombre' => $producto->nombre,
                    'precio' => $producto->precio,
                    'stock' => $producto->stock,
                    'descripcion' => $producto->descripcion,
                    'creado' => $producto->created_at->format('Y-m-d H:i:s'),
                ];
            }),
        ];
    }
}
