variable "key_name" {
  type = string
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
  owners      = ["099720109477"]

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"]
  }
}

variable "duckdns_token" {
  type        = string
  sensitive   = true
}

variable "r2_access_key_id" {
  type        = string
  sensitive   = true
}

variable "r2_secret_access_key" {
  type        = string
  sensitive   = true
}

data "aws_vpc" "default_vpc" {
  default = true
}

variable "Instance_Profile" {
  type    = string
  default = "LabInstanceProfile"
}

variable "Instance_Type" {
  type    = string
  default = "t2.medium"
}

variable "db_root_password" {
  type      = string
  sensitive = true
}
