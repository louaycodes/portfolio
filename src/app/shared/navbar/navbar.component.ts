import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Profile } from '../models/profile.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: false,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isAffix = false;
  menuOpen = false;
  firstName = 'LZ';
  lastName = '';
  isDarkMode = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Load saved theme
    const saved = localStorage.getItem('theme');
    const systemLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    if (saved === 'light' || (!saved && systemLight)) {
      this.isDarkMode = false;
      document.body.setAttribute('data-theme', 'light');
    } else {
      this.isDarkMode = true;
      document.body.removeAttribute('data-theme');
    }

    this.apiService.getProfile().subscribe({
      next: (profile: Profile) => {
        const parts = profile.fullName.trim().split(' ');
        this.firstName = parts[0] || 'LZ';
        this.lastName = parts.slice(1).join(' ');
      },
      error: () => {
        this.firstName = 'LZ';
        this.lastName = '';
      }
    });
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isAffix = (window.scrollY || document.documentElement.scrollTop) > 50;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  scrollTo(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 70; // navbar height
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    this.menuOpen = false;
  }
}
