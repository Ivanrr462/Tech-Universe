#!/bin/bash
set -x

export APP_ENV=production
export APP_DEBUG=false
export COMPOSER_NO_INTERACTION=1
export CI=true
export SHELL_VERBOSITY=0
export DEBIAN_FRONTEND=noninteractive

cd /var/www/api

# =========================
# DEPENDENCIAS PHP
# =========================
export PATH=$PATH:/usr/local/bin:/usr/bin

if ! command -v composer >/dev/null 2>&1; then
  curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
  chmod +x /usr/local/bin/composer
fi

/usr/local/bin/composer install --no-dev --optimize-autoloader

if [ ! -f /var/www/api/.env ]; then
  cp /var/www/.env.base /var/www/api/.env
fi
php artisan key:generate --force --no-interaction

# =========================
# MIGRACIONES
# =========================
php artisan migrate --force --no-interaction
php artisan db:seed --class=CoreSeeder --force --no-interaction

# =========================
# FRONTEND (FILAMENT + VITE)
# =========================
npm install
npm run build

# =========================
# CACHE LARAVEL
# =========================
php artisan config:cache --no-interaction
php artisan route:cache --no-interaction
php artisan view:cache --no-interaction

# =========================
# PERMISOS CORRECTOS
# =========================
chown -R www-data:www-data /var/www/api
chmod -R 775 storage bootstrap/cache