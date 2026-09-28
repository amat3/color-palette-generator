output "cloud_run_url" {
  description = "URL pública del servicio desplegado en Cloud Run"
  value       = google_cloud_run_v2_service.color_palette_service.uri
}

output "artifact_registry_repo" {
  description = "Nombre del repositorio en Artifact Registry"
  value       = google_artifact_registry_repository.color_palette_repo.name
}
