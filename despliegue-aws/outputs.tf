output "instance_public_ip" {
  description = "IP pública de la instancia EC2"
  value       = aws_instance.backend.public_ip
}

output "instance_id" {
  description = "ID de la instancia EC2"
  value       = aws_instance.backend.id
}

output "api_url" {
  description = "URL de la API"
  value       = "http://${aws_instance.backend.public_ip}:8080/api"
}

output "ssh_command" {
  description = "Comando SSH para conectarse"
  value       = "ssh -i vockey.pem ubuntu@${aws_instance.backend.public_ip}"
}

output "phpmyadmin_tunnel_command" {
  description = "Comando para crear túnel SSH a phpMyAdmin (Acceso en http://localhost:8081)"
  value       = "ssh -i vockey.pem -L 8081:localhost:8081 ubuntu@${aws_instance.backend.public_ip}"
}
