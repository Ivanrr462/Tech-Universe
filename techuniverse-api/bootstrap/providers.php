<?php

use App\Providers\AppServiceProvider;
use App\Providers\Filament\AdminPanelProvider;
use Filament\PanelProvider;

return array_filter([
    AppServiceProvider::class,
    class_exists(PanelProvider::class) ? AdminPanelProvider::class : null,
]);
