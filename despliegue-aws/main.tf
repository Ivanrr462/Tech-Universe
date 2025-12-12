terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
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
    cidr_blocks = [var.allowed_ssh_cidr]
  }

  # API PHP
  ingress {
    description = "PHP API"
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # phpMyAdmin (Solo accesible mediante túnel SSH, puerto cerrado públicamente)

  # Salida: todo permitido
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

}

# EC2 instance
resource "aws_instance" "backend" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.instance_type
  key_name               = var.key_name
  subnet_id              = data.aws_subnets.default.ids[0]
  vpc_security_group_ids = [aws_security_group.backend_sg.id]

  user_data = templatefile("userdata/ec2-init.sh", {
    GIT_REPO_URL = var.git_repo_url
  })

  tags = {
    Name = "${var.project_name}-backend"
  }
}

# Volumen EBS opcional para persistencia extra
# Ya puedes usar volúmenes Docker internos
