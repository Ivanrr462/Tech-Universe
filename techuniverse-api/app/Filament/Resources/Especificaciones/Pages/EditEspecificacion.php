<?php

namespace App\Filament\Resources\Especificaciones\Pages;

use App\Filament\Resources\Especificaciones\EspecificacionResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditEspecificacion extends EditRecord
{
    protected static string $resource = EspecificacionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
