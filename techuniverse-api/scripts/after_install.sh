#!/bin/bash
set -e

# =========================
# PHP (por si el userdata no lo instaló)
# =========================
if ! command -v php &>/dev/null; then
  apt-get update -y
  DEBIAN_FRONTEND=noninteractive apt-get install -y \
    php8.3 php8.3-cli php8.3-mysql php8.3-xml \
    php8.3-mbstring php8.3-curl php8.3-zip php8.3-bcmath php8.3-intl \
    libapache2-mod-php8.3
  update-alternatives --set php /usr/bin/php8.3 2>/dev/null || true
fi

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
# APP KEY — solo si no hay una ya generada
# =========================
if grep -q "^APP_KEY=$" .env; then
  php artisan key:generate --force
fi

# =========================
# MIGRACIONES
# — migrate:fresh solo en el primer despliegue (no existe ninguna tabla aún)
# — migrate en despliegues posteriores (conserva los datos)
# =========================
TABLES=$(php artisan db:show --json 2>/dev/null | grep -c '"name"' || echo 0)

if [ "$TABLES" -le 1 ]; then
  echo "📦 Primera instalación — ejecutando migrate:fresh --seed"
  php artisan migrate:fresh --seed --force --no-interaction
else
  echo "🔄 Despliegue de código — ejecutando migrate"
  php artisan migrate --force --no-interaction
fi

# =========================
# CACHÉ
# =========================
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
