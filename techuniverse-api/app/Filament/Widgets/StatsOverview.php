<?php

namespace App\Filament\Widgets;

use App\Models\Categoria;
use App\Models\Producto;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Productos', Producto::count())
                ->description('Productos registrados')
                ->icon('heroicon-o-cube')
                ->color('warning'),

            Stat::make('Total Usuarios', User::count())
                ->description('Usuarios registrados')
                ->icon('heroicon-o-users')
                ->color('success'),

            Stat::make('Total Categorías', Categoria::count())
                ->description('Categorías activas')
                ->icon('heroicon-o-tag')
                ->color('info'),

            Stat::make('Productos sin stock', Producto::where('stock', 0)->count())
                ->description('Requieren reposición')
                ->icon('heroicon-o-exclamation-triangle')
                ->color('danger'),
        ];
    }
}
