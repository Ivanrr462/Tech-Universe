<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $precio = $this->precio;
        $descuento = $this->descuento ?? 0;

        // Calcular precio con descuento
        $precioDescuento = $descuento > 0
            ? round($precio - ($precio * ($descuento / 100)), 2)
            : $precio;

        return [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'precio' => $precio,
            'descuento' => $descuento,
            'precioDescuento' => $precioDescuento,
            'stock' => $this->stock,
            'descripcion' => $this->descripcion,

            'modificado' => $this->updated_at
                ? $this->updated_at->format('Y-m-d H:i:s')
                : null,

            'foto' => $this->foto && $this->foto !== ''
                ? (str_starts_with($this->foto, 'http')
                    ? $this->foto
                    : rtrim(config('filesystems.disks.r2.url', ''), '/').'/'.$this->foto)
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
