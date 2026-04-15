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
                return [
                    'id' => $producto->id,
                    'nombre' => $producto->nombre,
                    'precio_unitario' => $producto->pivot->precio_unitario,
                    'cantidad' => $producto->pivot->cantidad,
                    'subtotal' => $producto->pivot->precio_unitario * $producto->pivot->cantidad,
                ];
            }),
            'precio_total' => $this->productosIngresados->sum(function ($producto) {
                return $producto->pivot->precio_unitario * $producto->pivot->cantidad;
            }),
            'cantidad_total' => $this->productosIngresados->sum(function ($producto) {
                return $producto->pivot->cantidad;
            }),
        ];
    }
}