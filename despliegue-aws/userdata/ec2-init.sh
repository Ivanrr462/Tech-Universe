#!/bin/bash

# Redirigir output para debug
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1

echo "Iniciando configuración del servidor..."

# 1. Actualizar paquetes e instalar dependencias básicas
apt-get update -y
apt-get install -y ca-certificates curl gnupg lsb-release git

# 2. Instalar Docker
mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

apt-get update -y
apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# 3. Configurar usuario ubuntu para Docker
usermod -aG docker ubuntu

# 4. Clonar el repositorio
echo "Clonando repositorio..."
cd /home/ubuntu
# Usamos la variable inyectada por Terraform
sudo -u ubuntu git clone ${GIT_REPO_URL} backend

# 5. Iniciar la aplicación
cd backend
echo "Levantando contenedores..."
# Usar el plugin de docker compose (v2)
sudo -u ubuntu docker compose up -d --build

echo "Despliegue finalizado!"
