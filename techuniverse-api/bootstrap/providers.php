<?php

return array_filter([
    App\Providers\AppServiceProvider::class,
    class_exists(\Filament\PanelProvider::class) ? App\Providers\Filament\AdminPanelProvider::class : null,
]);
