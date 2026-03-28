import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../../shared/services/project.service';
import { ApiService } from '../../../shared/services/api.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  standalone: false,
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent implements OnInit {
  project: Project | undefined;
  selectedImage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const rawId = this.route.snapshot.paramMap.get('id');
    if (!rawId) {
      this.router.navigate(['/projects']);
      return;
    }
    const id = Number(rawId);
    this.apiService.getProjectById(id).subscribe({
      next: (project) => {
        this.project = project;
      },
      error: () => {
        this.router.navigate(['/projects']);
      }
    });
  }

  get imageList(): string[] {
    if (!this.project?.images) return [];
    return this.project.images.split(',').map((u: string) => u.trim()).filter((u: string) => u.length > 0);
  }

  openLightbox(url: string): void {
    this.selectedImage = url;
  }

  closeLightbox(): void {
    this.selectedImage = null;
  }
}
