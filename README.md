# Proyecto-E-commerce

Rama -> develop




Walkthrough - TechUniverse AWS Deployment
✅ Despliegue Completado Exitosamente

Tu servidor EC2 se está iniciando y configurando automáticamente.

🚀 Datos de Conexión
Recurso	Valor / Comando
IP Pública	54.237.57.59
API URL	http://54.237.57.59:8080/api
SSH Acceso	ssh -i vockey.pem ubuntu@54.237.57.59
phpMyAdmin	ssh -i vockey.pem -L 8081:localhost:8081 ubuntu@54.237.57.59
⏳ ¿Qué está pasando ahora?
El servidor tarda unos 3-5 minutos en ejecutar el script de configuración inicial (User Data). Este script está:

Actualizando el sistema (apt update)
Instalando Docker y Git
Clonando tu repositorio APITest
Levantando los contenedores
🔍 Verificación
Para ver el progreso en tiempo real, conéctate por SSH y ejecuta:

# 1. Conectar por SSH
ssh -i vockey.pem ubuntu@54.237.57.59
# 2. Ver el log del script de inicio
tail -f /var/log/user-data.log
# 3. Ver estado de los contenedores
sudo docker ps
Si todo ha ido bien, deberías ver 3 contenedores corriendo (web_techuniverse, db_techuniverse, pma_techuniverse).

🛠 Troubleshooting
Si la API no responde en 5 minutos:

Verifica el log: cat /var/log/user-data.log
Verifica si se clonó el repo: ls -la /home/ubuntu/backend
Verifica logs de docker: cd /home/ubuntu/backend && sudo docker compose logs