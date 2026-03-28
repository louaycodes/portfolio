import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly STORAGE_KEY = 'admin_credentials';

  login(username: string, password: string): void {
    const encoded = btoa(`${username}:${password}`);
    localStorage.setItem(this.STORAGE_KEY, encoded);
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  getCredentials(): string | null {
    return localStorage.getItem(this.STORAGE_KEY);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.STORAGE_KEY);
  }
}
