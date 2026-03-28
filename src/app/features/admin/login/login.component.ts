import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  onSubmit(): void {
    if (!this.username || !this.password) return;

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.username, this.password);

    const encoded = btoa(`${this.username}:${this.password}`);
    const headers = new HttpHeaders({
      'Authorization': `Basic ${encoded}`,
      'Content-Type': 'application/json'
    });

    this.http.get('http://localhost:8080/api/projects', { headers }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.authService.logout();
        this.errorMessage = 'Invalid credentials. Please try again.';
      }
    });
  }
}
