FROM php:8.2-apache

# Activar extensiones
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Activar mod_rewrite
RUN a2enmod rewrite
