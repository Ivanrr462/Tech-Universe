<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // Definimos el JSON de salida
        return [
            'id' => $this->id,
            'nombre' => $this->nombre, // Podemos renombrar campos si queremos
            'precio' => $this->precio,
            'stock' => $this->stock,
            'descripcion' => $this->descripcion,
            'creado' => $this->created_at->format('Y-m-d H:i:s'),
            'categoria' => $this->categoria ? [
                'nombre' => $this->categoria->nombre,
            ] : null,
        ];
    }
}
