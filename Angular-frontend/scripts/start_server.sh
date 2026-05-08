#!/bin/bash
set -e

chown -R www-data:www-data /var/www/frontend || true

systemctl restart apache2 || systemctl restart httpd || true