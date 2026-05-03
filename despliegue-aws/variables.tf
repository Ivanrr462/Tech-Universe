variable "key_name" {
  type    = string
  default = "vockey"
}

variable "region" {
  type    = string
  default = "us-east-1"
}

variable "domain" {
  type    = string
  default = "techuniverse.com"
}

data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}

variable "Instance_Type" {
    type = string
    default = "t2.medium"
}

variable "db_root_password" {
  type        = string
  sensitive   = true
}