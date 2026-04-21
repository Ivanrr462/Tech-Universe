<?php

namespace App\Filament\Resources\Especificaciones\Pages;

use App\Filament\Resources\Especificaciones\EspecificacionResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListEspecificaciones extends ListRecords
{
    protected static string $resource = EspecificacionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
