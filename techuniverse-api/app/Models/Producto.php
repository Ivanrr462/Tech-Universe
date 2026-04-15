<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;
    protected $fillable = ['nombre', 'precio', 'stock', 'descripcion', 'categoria_id'];
    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    public function usuariosQueLoDesean()
    {
        return $this->belongsToMany(User::class, 'producto_user');
    }

    public function cestas()
    {
        return $this->belongsToMany(Cesta::class, 'producto_cestas', 'producto_id', 'cesta_id');
    }

    public function especificaciones()
    {
        return $this->belongsToMany(especificaciones::class, 'producto_especificacions', 'producto_id', 'especificacion_id')
            ->withPivot('valor')
            ->withTimestamps();
    }

    public function productoEspecificaciones()
    {
        return $this->hasMany(ProductoEspecificacion::class);
    }
}
