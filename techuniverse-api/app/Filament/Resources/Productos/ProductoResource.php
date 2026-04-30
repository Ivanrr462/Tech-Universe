<?php

namespace App\Filament\Resources\Productos;

use App\Models\Producto;
use BackedEnum;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ProductoResource extends Resource
{
    protected static ?string $model = Producto::class;

    protected static BackedEnum|string|null $navigationIcon = 'heroicon-o-cube';

    protected static ?string $navigationLabel = 'Productos';

    protected static ?string $pluralModelLabel = 'Productos';

    protected static ?string $modelLabel = 'Producto';

    public static function form(Schema $form): Schema
    {
        return $form
            ->schema([
                TextInput::make('nombre')
                    ->label('Nombre')
                    ->required()
                    ->maxLength(255)
                    ->columnSpanFull(),

                Select::make('categoria_id')
                    ->label('Categoría')
                    ->relationship('categoria', 'nombre')
                    ->required(),

                TextInput::make('precio')
                    ->label('Precio')
                    ->numeric()
                    ->required(),

                TextInput::make('stock')
                    ->label('Stock')
                    ->numeric()
                    ->required(),

                Textarea::make('descripcion')
                    ->label('Descripción')
                    ->columnSpanFull(),

                Repeater::make('productoEspecificaciones')
                    ->label('Especificaciones')
                    ->relationship('productoEspecificaciones')
                    ->schema([
                        Select::make('especificacion_id')
                            ->label('Especificación')
                            ->relationship('especificacion', 'nombre')
                            ->required(),

                        TextInput::make('valor')
                            ->label('Valor')
                            ->required()
                            ->maxLength(255),
                    ])
                    ->columns(2)
                    ->createItemButtonLabel('Añadir especificación')
                    ->collapsible()
                    ->columnSpanFull(),

                FileUpload::make('foto')
                    ->label('Foto')
                    ->disk('r2')
                    ->directory('productos')
                    ->image()
                    ->required()
                    ->visibility('public')
                    ->maxSize(4096)
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('foto')
                    ->disk('r2')
                    ->label('Foto')
                    ->square(),

                TextColumn::make('nombre')
                    ->label('Nombre')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('precio')
                    ->label('Precio')
                    ->sortable(),

                TextColumn::make('stock')
                    ->label('Stock')
                    ->sortable(),

                TextColumn::make('categoria.nombre')
                    ->label('Categoría')
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
            'index' => Pages\ListProductos::route('/'),
            'create' => Pages\CreateProducto::route('/create'),
            'edit' => Pages\EditProducto::route('/{record}/edit'),
        ];
    }
}
