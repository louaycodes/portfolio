import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Profile } from '../models/profile.model';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  standalone: false
})
export class HeroComponent implements OnInit {
  profile: Profile | null = null;
  loading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getProfile().subscribe({
      next: (data) => {
        this.profile = data;
        this.loading = false;
        setTimeout(() => this.injectTerminalContent(), 600);
      },
      error: () => {
        this.profile = null;
        this.loading = false;
        setTimeout(() => this.injectTerminalContent(), 600);
      }
    });
  }

  get firstName(): string {
    if (!this.profile?.fullName) return 'Louay';
    return this.profile.fullName.trim().split(' ')[0];
  }

  injectTerminalContent(): void {
    const name = this.firstName;
    if ((window as any).initHeroTerminalTyping) {
      (window as any).initHeroTerminalTyping(name);
    }
    if ((window as any).initLifeTyping) {
      (window as any).initLifeTyping(name);
    }
  }
}