#!/bin/bash

cd /var/www/api

# =========================
# PERMISOS INICIALES
# =========================
chown -R ubuntu:ubuntu /var/www/api
chmod -R 775 /var/www/api

# =========================
# ENV
# =========================
if [ ! -f .env ]; then
  cp /var/www/.env.base .env
fi

# =========================
# COMPOSER
# =========================
export HOME=/root
export COMPOSER_HOME=/root/.composer

composer install --no-dev --optimize-autoloader --no-interaction

# =========================
# ARTISAN
# =========================
php artisan key:generate --force

php artisan migrate --force --no-interaction

php artisan db:seed --force --no-interaction || true

php artisan optimize:clear
php artisan config:cache
php artisan route:cache || true
php artisan view:cache

# =========================
# PERMISOS FINALES
# =========================
chown -R www-data:www-data /var/www/api
chmod -R 775 /var/www/api/storage /var/www/api/bootstrap/cache

systemctl restart apache2 || true