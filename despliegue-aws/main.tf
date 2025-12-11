provider "aws" {
  region = var.aws_region
}

# VPC default
data "aws_vpc" "default" {
  default = true
}

# Subnet default
data "aws_subnet_ids" "default" {
  vpc_id = data.aws_vpc.default.id
}

# Security Group
resource "aws_security_group" "backend_sg" {
  name        = "${var.project_name}-sg"
  description = "SG para EC2 Backend PHP + MySQL"
  vpc_id      = data.aws_vpc.default.id

  # SSH
  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.allowed_ip]
  }

  # API PHP
  ingress {
    description = "PHP API"
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # phpMyAdmin (opcional, restringido a tu IP)
  ingress {
    description = "phpMyAdmin"
    from_port   = 8081
    to_port     = 8081
    protocol    = "tcp"
    cidr_blocks = [var.allowed_ip]
  }

  # Salida: todo permitido
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-sg"
  }
}

# EC2 instance
resource "aws_instance" "backend" {
  ami                    = var.ami_id
  instance_type          = var.instance_type
  key_name               = var.key_name
  subnet_id              = data.aws_subnet_ids.default.ids[0]
  vpc_security_group_ids = [aws_security_group.backend_sg.id]

  user_data = file("userdata/ec2-init.sh")

  tags = {
    Name = "${var.project_name}-backend"
  }
}

# Volumen EBS opcional para persistencia extra
# Ya puedes usar volúmenes Docker internos
