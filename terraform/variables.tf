variable "project_id" {
  description = "ID del proyecto de Google Cloud"
  type        = string
  default     = "color-palette-generator-509711"
}

variable "region" {
  description = "Región de despliegue"
  type        = string
  default     = "europe-southwest1"
}

variable "repository_name" {
  description = "Nombre del repositorio de Artifact Registry"
  type        = string
  default     = "color-palette-generator"
}

variable "service_name" {
  description = "Nombre del servicio de Cloud Run"
  type        = string
  default     = "color-palette-generator"
}

variable "image_url" {
  description = "URL completa de la imagen Docker en Artifact Registry"
  type        = string
  default     = "europe-southwest1-docker.pkg.dev/color-palette-generator-509711/color-palette-generator/color-palette-generator:latest"
}
