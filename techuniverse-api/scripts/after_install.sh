#!/bin/bash
set -e

cd /var/www/api

export PATH=$PATH:/usr/local/bin:/usr/bin
export APP_ENV=production
export APP_DEBUG=false
export COMPOSER_NO_INTERACTION=1

# =========================
# DEPENDENCIAS
# =========================
if ! command -v composer >/dev/null 2>&1; then
  curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
fi

/usr/local/bin/composer install --no-dev --optimize-autoloader

# =========================
# ENV
# =========================
cp -n /var/www/.env.base /var/www/api/.env

php artisan key:generate --force --no-interaction

# =========================
# MIGRACIONES
# =========================
php artisan migrate --force --no-interaction
#php artisan db:seed --force --no-interaction

# =========================
# FRONTEND
# =========================
npm install
npm run build

# =========================
# PERMISOS (ESTO VA AL FINAL)
# =========================
chown -R www-data:www-data /var/www/api

chmod -R 775 /var/www/api/storage
chmod -R 775 /var/www/api/bootstrap/cache

# =========================
# CACHE (SIEMPRE AL FINAL)
# =========================
php artisan optimize:clear
php artisan config:cache --no-interaction
php artisan route:cache --no-interaction
php artisan view:cache --no-interaction