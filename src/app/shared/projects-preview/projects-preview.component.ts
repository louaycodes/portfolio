import { Component, OnInit } from '@angular/core';
import { Project } from '../services/project.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-projects-preview',
  templateUrl: './projects-preview.component.html',
  styleUrl: './projects-preview.component.css'
})
export class ProjectsPreviewComponent implements OnInit {
  projects: Project[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getProjects().subscribe(data => {
      this.projects = data.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)).slice(0, 3);
    });
  }
}
