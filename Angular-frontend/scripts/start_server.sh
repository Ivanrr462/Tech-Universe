#!/bin/bash
chown -R www-data:www-data /var/www/frontend
systemctl restart nginx
