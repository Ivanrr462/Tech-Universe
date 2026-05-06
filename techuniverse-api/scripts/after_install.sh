#!/bin/bash
#blablabla
chown -R ubuntu:ubuntu /var/www/api
cd /var/www/api
composer install --no-dev --optimize-autoloader
cp /var/www/.env.base .env
php artisan key:generate --force
php artisan migrate --force
php artisan db:seed --force
php artisan config:cache
php artisan route:cache
chown -R www-data:www-data /var/www/api
chmod -R 775 /var/www/api/storage
chmod -R 775 /var/www/api/bootstrap/cache