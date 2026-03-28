import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AboutSection } from '../../../shared/models/about-section.model';

@Injectable({ providedIn: 'root' })
export class AboutAdminService {
  private apiUrl = 'http://localhost:8080/api/about';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const credentials = this.authService.getCredentials();
    return new HttpHeaders({
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json'
    });
  }

  getAll(): Observable<AboutSection[]> {
    return this.http.get<AboutSection[]>(this.apiUrl);
  }

  getByCategory(category: 'TECHNICAL' | 'PERSONAL'): Observable<AboutSection[]> {
    return this.http.get<AboutSection[]>(`${this.apiUrl}/category/${category}`);
  }

  create(section: AboutSection): Observable<AboutSection> {
    return this.http.post<AboutSection>(this.apiUrl, section, { headers: this.getAuthHeaders() });
  }

  update(id: number, section: AboutSection): Observable<AboutSection> {
    return this.http.put<AboutSection>(`${this.apiUrl}/${id}`, section, { headers: this.getAuthHeaders() });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
