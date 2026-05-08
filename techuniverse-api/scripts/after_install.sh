#!/bin/bash
set -e

cd /var/www/api

chown -R www-data:www-data /var/www/api
chmod -R 775 storage bootstrap/cache

if [ ! -f .env ]; then
  cp /var/www/.env.base .env
fi

php artisan key:generate --force || true

php artisan migrate --force --no-interaction

php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

# IMPORTANTE FILAMENT
php artisan filament:assets || true

systemctl restart apache2 || true