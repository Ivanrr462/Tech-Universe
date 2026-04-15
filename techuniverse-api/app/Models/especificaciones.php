<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Database\Factories\EspecificacionFactory;

class especificaciones extends Model
{
    use HasFactory;

    protected $table = 'especificaciones';
    protected $fillable = ['nombre'];

    protected static function newFactory(): EspecificacionFactory
    {
        return EspecificacionFactory::new();
    }

    public function productos()
    {
        return $this->belongsToMany(Producto::class, 'producto_especificacions', 'especificacion_id', 'producto_id')
            ->withPivot('valor')
            ->withTimestamps();
    }

    public function productoEspecificaciones()
    {
        return $this->hasMany(ProductoEspecificacion::class, 'especificacion_id');
    }
}
