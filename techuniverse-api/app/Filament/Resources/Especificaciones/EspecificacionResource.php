<?php

namespace App\Filament\Resources\Especificaciones;

use App\Models\especificaciones;
use BackedEnum;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class EspecificacionResource extends Resource
{
    protected static ?string $model = especificaciones::class;

    protected static BackedEnum|string|null $navigationIcon = 'heroicon-o-cog-6-tooth';

    protected static ?string $navigationLabel = 'Especificaciones';

    protected static ?string $pluralModelLabel = 'Especificaciones';

    protected static ?string $modelLabel = 'Especificación';

    public static function form(Schema $form): Schema
    {
        return $form
            ->schema([
                TextInput::make('nombre')
                    ->label('Nombre')
                    ->required()
                    ->maxLength(255)
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('nombre')
                    ->label('Nombre')
                    ->searchable()
                    ->sortable(),
            ])
            ->actions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->bulkActions([
                DeleteBulkAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListEspecificaciones::route('/'),
            'create' => Pages\CreateEspecificacion::route('/create'),
            'edit' => Pages\EditEspecificacion::route('/{record}/edit'),
        ];
    }
}
