resource "google_artifact_registry_repository" "color_palette_repo" {
  location      = var.region
  repository_id = var.repository_name
  format        = "DOCKER"
  description   = "Docker images for color palette generator"
}

resource "google_cloud_run_v2_service" "color_palette_service" {
  name     = var.service_name
  location = var.region

  template {
    containers {
      image = var.image_url

      ports {
        container_port = 3000
      }
    }
  }

  lifecycle {
    ignore_changes = [
      client,
      client_version,
      template[0].containers[0].image,
    ]
  }
}

resource "google_cloud_run_service_iam_member" "public_access" {
  service  = google_cloud_run_v2_service.color_palette_service.name
  location = google_cloud_run_v2_service.color_palette_service.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}
