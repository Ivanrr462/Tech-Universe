variable "aws_region" {
  description = "Región de AWS"
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  description = "Tipo de instancia EC2"
  type        = string
  default     = "t2.micro"
}

variable "key_name" {
  description = "Nombre de la clave SSH para EC2"
  type        = string
}

variable "allowed_ip" {
  description = "IP desde la que se permitirá acceso SSH y phpMyAdmin"
  type        = string
  default     = "0.0.0.0/0"
}

variable "project_name" {
  description = "Nombre del proyecto para etiquetar recursos"
  type        = string
  default     = "techuniverse"
}

variable "ami_id" {
  description = "AMI de Amazon Linux 2023"
  type        = string
  default     = "ami-0bdf93799014acdc4" # Ejemplo para us-east-1
}
