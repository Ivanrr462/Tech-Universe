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
            'foto' => $this->foto
                ? (str_starts_with($this->foto, 'http')
                    ? $this->foto
                    : env('R2_PUBLIC_URL').'/'.$this->foto)
                : 'https://pub-45ac6957fba64f04a0f8a0fd40292c60.r2.dev/productos/dvEcf0VxtjxaHq3yAHBw9uQr4CW4keFw3GFAUvqa.jpg',
            'categoria' => $this->categoria ? [
                'nombre' => $this->categoria->nombre,
            ] : null,
            'especificaciones' => $this->productoEspecificaciones->map(function ($productoEspec) {
                return [
                    'nombre' => $productoEspec->especificacion->nombre,
                    'valor' => $productoEspec->valor,
                ];
            }),
        ];
    }
}
