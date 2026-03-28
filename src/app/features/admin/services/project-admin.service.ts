import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Project } from '../../../shared/services/project.service';

@Injectable({ providedIn: 'root' })
export class ProjectAdminService {
  private apiUrl = 'http://localhost:8080/api/projects';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const credentials = this.authService.getCredentials();
    return new HttpHeaders({
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json'
    });
  }

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  create(p: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, p, { headers: this.getAuthHeaders() });
  }

  update(id: number, p: any): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${id}`, p, { headers: this.getAuthHeaders() });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
