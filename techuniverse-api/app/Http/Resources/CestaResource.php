<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CestaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'usuario' => [
                'id' => $this->user->id,
                'nombre' => $this->user->name,
                'email' => $this->user->email,
            ],
            'productos' => $this->productosIngresados->map(function ($producto) {
                $precio = $producto->pivot->precio_unitario;
                $descuento = $producto->descuento ?? 0;
                $precioDescuento = $descuento > 0
                    ? round($precio - ($precio * ($descuento / 100)), 2)
                    : $precio;

                return [
                    'id' => $producto->id,
                    'nombre' => $producto->nombre,
                    'foto' => $producto->foto_url,
                    'precio_unitario' => $precio,
                    'descuento' => $descuento,
                    'precioDescuento' => $precioDescuento,
                    'cantidad' => $producto->pivot->cantidad,
                    'subtotal' => $precioDescuento * $producto->pivot->cantidad,
                ];
            }),
            'precio_total' => $this->productosIngresados->sum(function ($producto) {
                $precio = $producto->pivot->precio_unitario;
                $descuento = $producto->descuento ?? 0;

                return ($descuento > 0
                    ? round($precio - ($precio * ($descuento / 100)), 2)
                    : $precio) * $producto->pivot->cantidad;
            }),
            'cantidad_total' => $this->productosIngresados->sum(function ($producto) {
                return $producto->pivot->cantidad;
            }),
        ];
    }
}
