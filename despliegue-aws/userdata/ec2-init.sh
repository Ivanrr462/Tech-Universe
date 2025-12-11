#!/bin/bash
# Actualizar paquetes
yum update -y

# Instalar Docker
yum install -y docker
systemctl enable docker
systemctl start docker
usermod -aG docker ec2-user

# Instalar Docker Compose
curl -L "https://github.com/docker/compose/releases/download/v2.27.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Crear carpeta backend
mkdir -p /home/ec2-user/backend
cd /home/ec2-user/backend

# Aquí deberías subir tu docker-compose.yml y Dockerfile a /home/ec2-user/backend
# Para pruebas rápidas, podemos clonar desde Git o usar SCP desde tu máquina local

# Levantar contenedores
docker-compose up -d --build
