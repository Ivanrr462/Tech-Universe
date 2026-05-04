terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.18.0"
    }
  }

  backend "s3" {
    bucket  = "techuniverse-terraform-state"
    key     = "terraform.tfstate"
    region  = "us-east-1"
  }
}

provider "aws" {
  region = var.region
}

// Grupos de seguridad
resource "aws_security_group" "all" {
  description = "Allow All Traffic"
  tags = {
    Name = "All"
  }
}

resource "aws_security_group" "Bastion" {
  description = "Allow Bastion Traffic"
  tags = {
    Name = "Bastion"
  }
}

resource "aws_security_group" "FrontEnd" {
  description = "Allow FrontEnd Traffic"
  tags = {
    Name = "FrontEnd"
  }
}

resource "aws_security_group" "BackEnd" {
  description = "Allow BackEnd Traffic"
  tags = {
    Name = "BackEnd"
  }
}

resource "aws_security_group" "BBDD" {
  description = "Allow Database Traffic"
  tags = {
    Name = "BBDD"
  }
}

// Reglas de seguridad
// Salida
resource "aws_vpc_security_group_egress_rule" "all" {
  ip_protocol       = "-1"
  cidr_ipv4         = "0.0.0.0/0"
  security_group_id = aws_security_group.all.id
}

// SSH
resource "aws_vpc_security_group_ingress_rule" "ssh" {
  security_group_id = aws_security_group.Bastion.id
  from_port         = 22
  to_port           = 22
  ip_protocol       = "TCP"
  cidr_ipv4         = "0.0.0.0/0"
}

resource "aws_vpc_security_group_ingress_rule" "ssh_FrontEnd" {
  security_group_id            = aws_security_group.FrontEnd.id
  from_port                    = 22
  to_port                      = 22
  ip_protocol                  = "TCP"
  referenced_security_group_id = aws_security_group.Bastion.id
}

resource "aws_vpc_security_group_ingress_rule" "ssh_BackEnd" {
  security_group_id            = aws_security_group.BackEnd.id
  from_port                    = 22
  to_port                      = 22
  ip_protocol                  = "TCP"
  referenced_security_group_id = aws_security_group.Bastion.id
}

// El salto ssh a la base de datos solo puede hacerse desde el backend pq me da la gana que sea asi :)
resource "aws_vpc_security_group_ingress_rule" "ssh_BBDD" {
  security_group_id            = aws_security_group.BBDD.id
  from_port                    = 22
  to_port                      = 22
  ip_protocol                  = "TCP"
  referenced_security_group_id = aws_security_group.BackEnd.id
}

// HTTP
resource "aws_vpc_security_group_ingress_rule" "http" {
  security_group_id = aws_security_group.FrontEnd.id
  from_port         = 80
  to_port           = 80
  ip_protocol       = "TCP"
  cidr_ipv4         = "0.0.0.0/0"
}

resource "aws_vpc_security_group_ingress_rule" "http_BackEnd" {
  security_group_id = aws_security_group.BackEnd.id
  from_port         = 80
  to_port           = 80
  ip_protocol       = "TCP"
  referenced_security_group_id = aws_security_group.FrontEnd.id
}

// BBDD
resource "aws_vpc_security_group_ingress_rule" "mysql_BBDD" {
  security_group_id            = aws_security_group.BBDD.id
  from_port                    = 3306
  to_port                      = 3306
  ip_protocol                  = "TCP"
  referenced_security_group_id = aws_security_group.BackEnd.id
}

// Instancias
resource "aws_instance" "Bastion" {
  ami = data.aws_ami.ubuntu.id
  instance_type = var.Instance_Type
  key_name = var.key_name
  vpc_security_group_ids = [ aws_security_group.all.id, aws_security_group.Bastion.id ]
  tags = {
    Name = "Bastion"
  }
}

resource "aws_instance" "FrontEnd" {
  ami = data.aws_ami.ubuntu.id
  instance_type = var.Instance_Type
  key_name = var.key_name
  vpc_security_group_ids = [ aws_security_group.all.id, aws_security_group.FrontEnd.id ]
  user_data_replace_on_change = true
  depends_on = [aws_instance.BackEnd]
  tags = {
    Name = "FrontEnd"
  }
}

resource "aws_instance" "BackEnd" {
  ami = data.aws_ami.ubuntu.id
  instance_type = var.Instance_Type
  key_name = var.key_name
  vpc_security_group_ids = [ aws_security_group.all.id, aws_security_group.BackEnd.id ]
  user_data = templatefile("userdata/backend.tftpl", {
    DB_HOST          = aws_instance.BBDD.private_ip
    DB_ROOT_PASSWORD = var.db_root_password
  })
  user_data_replace_on_change = true
  depends_on = [aws_instance.BBDD]
  tags = {
    Name = "BackEnd"
  }
}

resource "aws_instance" "BBDD" {
  ami = data.aws_ami.ubuntu.id
  instance_type = var.Instance_Type
  key_name = var.key_name
  vpc_security_group_ids = [ aws_security_group.all.id, aws_security_group.BBDD.id ]
  user_data = templatefile("userdata/bbdd.tftpl", {
    DB_ROOT_PASSWORD = var.db_root_password
  })
  user_data_replace_on_change = true
  tags = {
    Name = "BBDD"
  }
}

// IP Elástica
//resource "aws_eip" "ipelastica" {
  // Por ahora lo asocio a la instancia del backend ya que es mejor tenerla con una ip fija
//  instance = aws_instance.BackEnd.id
//  domain = "vpc"
//  tags = {
//    Name = "ip elastica"
//  }
//}

// Ruta 53
resource "aws_route53_zone" "default" {
  name = var.domain
  vpc {
    vpc_id = data.aws_vpc.default_vpc.id
    vpc_region = var.region
  }
}

// Record del Bastion
resource "aws_route53_record" "bastion_record" {
  type = "A"
  name = "bastion.${var.domain}"
  zone_id = aws_route53_zone.default.zone_id
  ttl = 3600
  records = [ aws_instance.Bastion.private_ip ] 
}

// Record del FrontEnd
resource "aws_route53_record" "frontend_record" {
  type = "A"
  name = "frontend.${var.domain}"
  zone_id = aws_route53_zone.default.zone_id
  ttl = 3600
  records = [ aws_instance.FrontEnd.private_ip ] 
}

// Record del BackEnd
resource "aws_route53_record" "backend_record" {
  type = "A"
  name = "backend.${var.domain}"
  zone_id = aws_route53_zone.default.zone_id
  ttl = 3600
  records = [ aws_instance.BackEnd.public_ip ] 
}
