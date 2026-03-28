import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Profile } from '../../../shared/models/profile.model';

@Injectable({ providedIn: 'root' })
export class ProfileAdminService {
  private apiUrl = 'http://localhost:8080/api/profile';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const credentials = this.authService.getCredentials();
    return new HttpHeaders({
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json'
    });
  }

  get(): Observable<Profile> {
    return this.http.get<Profile>(this.apiUrl);
  }

  save(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(this.apiUrl, profile, { headers: this.getAuthHeaders() });
  }
}
