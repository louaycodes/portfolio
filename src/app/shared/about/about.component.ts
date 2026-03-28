import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AboutSection } from '../models/about-section.model';
import { Profile } from '../models/profile.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  activeTab: 'technical' | 'personal' = 'technical';
  technicalSections: AboutSection[] = [];
  personalSections: AboutSection[] = [];
  activeSection: AboutSection | null = null;
  
  profile: Profile | null = null;
  loading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getProfile().subscribe(p => this.profile = p);
    
    this.apiService.getAboutSections().subscribe(data => {
      this.technicalSections = data.filter(s => s.category === 'TECHNICAL').sort((a,b) => a.displayOrder - b.displayOrder);
      this.personalSections = data.filter(s => s.category === 'PERSONAL').sort((a,b) => a.displayOrder - b.displayOrder);
      
      if (this.technicalSections.length > 0) {
        this.activeSection = this.technicalSections[0];
      }
      this.loading = false;
    });
  }

  setTab(tab: 'technical' | 'personal'): void {
    this.activeTab = tab;
    const list = tab === 'technical' ? this.technicalSections : this.personalSections;
    if (list.length > 0) {
      this.activeSection = list[0];
    } else {
      this.activeSection = null;
    }
  }

  setActiveSection(section: AboutSection): void {
    this.activeSection = section;
  }
}
