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
  default     = "vockey"
}


variable "project_name" {
  description = "Nombre del proyecto para etiquetar recursos"
  type        = string
  default     = "techuniverse"
}

data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical (propietario oficial de Ubuntu)

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"] # Hardware Virtual Machine (virtualización completa)
  }
}

# VPC default
data "aws_vpc" "default" {
  default = true
}

# Subnet default
data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

variable "git_repo_url" {
  description = "URL del repositorio Git para clonar el código en el servidor"
  type        = string
}

variable "allowed_ssh_cidr" {
  description = "CIDR block permitido para acceso SSH"
  type        = string
  default     = "0.0.0.0/0"
}
