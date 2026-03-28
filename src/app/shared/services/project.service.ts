import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string;
  images: string;
  githubUrl: string;
  liveUrl?: string;
  displayOrder?: number;
  
  // UI Helpers (generated automatically from raw strings)
  techStackArray?: string[];
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:8080/api/projects';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl).pipe(
      map(projects => projects.map(p => ({
        ...p,
        techStackArray: (p.techStack || '').split(',').map(s => s.trim()).filter(Boolean),
        imageUrl: (p.images || '').split(',').map(s => s.trim()).filter(Boolean)[0] || 'https://placehold.co/800x450/0d1117/00E676?text=Portfolio'
      })))
    );
  }

  getById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`).pipe(
      map(p => ({
        ...p,
        techStackArray: (p.techStack || '').split(',').map(s => s.trim()).filter(Boolean),
        imageUrl: (p.images || '').split(',').map(s => s.trim()).filter(Boolean)[0] || 'https://placehold.co/800x450/0d1117/00E676?text=Portfolio'
      }))
    );
  }
}
