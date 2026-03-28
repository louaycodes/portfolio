import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Profile } from '../models/profile.model';
import { AboutSection } from '../models/about-section.model';
import { Project } from './project.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // --- Profile ---
  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseUrl}/profile`);
  }

  // --- About Sections ---
  getAboutSections(): Observable<AboutSection[]> {
    return this.http.get<AboutSection[]>(`${this.baseUrl}/about`);
  }

  getAboutByCategory(category: 'TECHNICAL' | 'PERSONAL'): Observable<AboutSection[]> {
    return this.http.get<AboutSection[]>(`${this.baseUrl}/about/category/${category}`);
  }

  // --- Projects (with dynamic UI property mapping) ---
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/projects`).pipe(
      map(projects => projects.map(p => ({
        ...p,
        techStackArray: (p.techStack || '').split(',').map(s => s.trim()).filter(Boolean),
        imageUrl: (p.images || '').split(',').map(s => s.trim()).filter(Boolean)[0] || 'https://placehold.co/800x450/0d1117/00E676?text=Portfolio'
      })))
    );
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/projects/${id}`).pipe(
      map(p => ({
        ...p,
        techStackArray: (p.techStack || '').split(',').map(s => s.trim()).filter(Boolean),
        imageUrl: (p.images || '').split(',').map(s => s.trim()).filter(Boolean)[0] || 'https://placehold.co/800x450/0d1117/00E676?text=Portfolio'
      }))
    );
  }
}
