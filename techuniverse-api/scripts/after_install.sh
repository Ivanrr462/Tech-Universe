#!/bin/bash
set -e

cd /var/www/api

# =========================
# DEPENDENCIAS PHP
# =========================
export PATH=$PATH:/usr/local/bin:/usr/bin
/usr/local/bin/composer install --no-dev --optimize-autoloader

php artisan key:generate --force

# =========================
# MIGRACIONES
# =========================
php artisan migrate --force
php artisan db:seed --force

# =========================
# FRONTEND (FILAMENT + VITE)
# =========================
npm install
npm run build

# =========================
# CACHE LARAVEL
# =========================
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

# =========================
# PERMISOS CORRECTOS
# =========================
chown -R www-data:www-data /var/www/api
chmod -R 775 storage bootstrap/cache