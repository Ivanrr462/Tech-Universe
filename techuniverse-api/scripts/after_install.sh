#!/bin/bash
set -e

cd /var/www/api

# permisos
chown -R www-data:www-data /var/www/api
chmod -R 775 storage bootstrap/cache

# env
if [ ! -f .env ]; then
  cp /var/www/.env.base .env
fi

# SOLO si php existe (seguridad)
if command -v php >/dev/null 2>&1; then

  php artisan key:generate --force || true
  php artisan migrate --force --no-interaction

  php artisan optimize:clear
  php artisan config:cache
  php artisan route:cache
  php artisan view:cache

fi

systemctl restart apache2 || true