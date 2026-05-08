#!/bin/bash
set -e

cd /var/www/api

# =========================
# PERMISOS (SIEMPRE AL INICIO DEL DEPLOY)
# =========================
chown -R www-data:www-data /var/www/api

chmod -R 775 storage bootstrap/cache

# =========================
# ENV
# =========================
if [ ! -f .env ]; then
  cp /var/www/.env.base .env
fi

php artisan key:generate --force || true

# =========================
# LARAVEL (SIN npm, SIN composer si usas build en CI)
# =========================
php artisan migrate --force --no-interaction

# ⚠️ seed SOLO si es necesario
# php artisan db:seed --force --no-interaction

# =========================
# CACHE LIMPIO
# =========================
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

# =========================
# RESTART
# =========================
systemctl restart apache2 || true