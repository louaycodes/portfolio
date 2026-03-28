import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ProjectAdminService } from '../services/project-admin.service';
import { AboutAdminService } from '../services/about-admin.service';
import { ProfileAdminService } from '../services/profile-admin.service';
import { Project } from '../../../shared/services/project.service';
import { AboutSection } from '../../../shared/models/about-section.model';
import { Profile } from '../../../shared/models/profile.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: false,
  styleUrl: './dashboard.component.css'
})


export class DashboardComponent implements OnInit {
  activeTab: 'projects' | 'about' | 'profile' = 'projects';
  errorMessage = '';

  // --- Projects State ---
  projects: Project[] = [];
  loading = false;

  showForm = false;
  editingProject: Project | null = null;
  form: Partial<Project> & { techStackRaw: string; imagesRaw: string } = {
    title: '',
    description: '',
    techStackRaw: '',
    imagesRaw: '',
    githubUrl: '',
    liveUrl: '',
    displayOrder: 0
  };

  // --- About Sections State ---
  aboutSections: AboutSection[] = [];
  loadingAbout = false;
  showAboutForm = false;
  editingAbout: AboutSection | null = null;
  aboutForm: Partial<AboutSection> = { name: '', category: 'TECHNICAL', content: '', displayOrder: 0 };

  // --- Profile State ---
  profile: Profile = {
    fullName: '', title: '', bio: '', overview: '',
    photoUrl: '', cvUrl: '', email: '',
    github: '', linkedin: '', location: '',
    phone: '', instagram: '', googleMeetUrl: ''
  };
  loadingProfile = false;
  profileSuccessMessage = '';

  constructor(
    private projectAdminService: ProjectAdminService,
    private aboutAdminService: AboutAdminService,
    private profileAdminService: ProfileAdminService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProjects();
    this.loadAboutSections();
    this.loadProfile();
  }

  setTab(tab: string): void {
  this.activeTab = tab as 'projects' | 'about' | 'profile';
  this.errorMessage = '';
  this.profileSuccessMessage = '';
}

  // ==============================
  // PROJECTS METHODS
  // ==============================
  loadProjects(): void {
    this.loading = true;
    this.projectAdminService.getAll().subscribe({
      next: (data) => { this.projects = data; this.loading = false; },
      error: () => { this.errorMessage = 'Failed to load projects.'; this.loading = false; }
    });
  }

  openAddForm(): void {
    this.editingProject = null;
    this.form = { title: '', description: '', techStackRaw: '', imagesRaw: '', githubUrl: '', liveUrl: '', displayOrder: 0 };
    this.showForm = true;
  }

  openEditForm(project: Project): void {
    this.editingProject = project;
    this.form = {
      ...project,
      techStackRaw: project.techStack,
      imagesRaw: project.images
    };
    this.showForm = true;
  }

  cancelForm(): void {
    this.showForm = false;
    this.editingProject = null;
  }

  submitForm(): void {
    const payload: any = {
      title: this.form.title || '',
      description: this.form.description || '',
      techStack: this.form.techStackRaw || '',
      images: this.form.imagesRaw || '',
      githubUrl: this.form.githubUrl || '',
      liveUrl: this.form.liveUrl || '',
      displayOrder: this.form.displayOrder || 0
    };

    if (this.editingProject) {
      this.projectAdminService.update(this.editingProject.id, payload).subscribe({
        next: () => { this.showForm = false; this.loadProjects(); },
        error: () => { this.errorMessage = 'Failed to update project.'; }
      });
    } else {
      this.projectAdminService.create(payload).subscribe({
        next: () => { this.showForm = false; this.loadProjects(); },
        error: () => { this.errorMessage = 'Failed to create project.'; }
      });
    }
  }

  deleteProject(project: Project): void {
    if (!window.confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
    this.projectAdminService.delete(project.id).subscribe({
      next: () => this.loadProjects(),
      error: () => { this.errorMessage = 'Failed to delete project.'; }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }

  // ==============================
  // ABOUT SECTIONS METHODS
  // ==============================
  loadAboutSections(): void {
    this.loadingAbout = true;
    this.aboutAdminService.getAll().subscribe({
      next: (data) => {
        this.aboutSections = data.sort((a, b) => a.displayOrder - b.displayOrder);
        this.loadingAbout = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load About sections.';
        this.loadingAbout = false;
      }
    });
  }

  openAddAboutForm(): void {
    this.editingAbout = null;
    this.aboutForm = { name: '', category: 'TECHNICAL', content: '', displayOrder: 0 };
    this.showAboutForm = true;
  }

  openEditAboutForm(section: AboutSection): void {
    this.editingAbout = section;
    this.aboutForm = { ...section };
    this.showAboutForm = true;
  }

  cancelAboutForm(): void {
    this.showAboutForm = false;
    this.editingAbout = null;
  }

  submitAboutForm(): void {
    const payload = this.aboutForm as AboutSection;
    if (!payload.name || !payload.content) {
      this.errorMessage = 'Name and content are required.';
      return;
    }

    if (this.editingAbout && this.editingAbout.id) {
      this.aboutAdminService.update(this.editingAbout.id, payload).subscribe({
        next: () => { this.showAboutForm = false; this.loadAboutSections(); },
        error: () => { this.errorMessage = 'Failed to update About section.'; }
      });
    } else {
      this.aboutAdminService.create(payload).subscribe({
        next: () => { this.showAboutForm = false; this.loadAboutSections(); },
        error: () => { this.errorMessage = 'Failed to create About section.'; }
      });
    }
  }

  deleteAboutSection(section: AboutSection): void {
    if (!section.id) return;
    if (!window.confirm(`Delete "${section.name}"? This cannot be undone.`)) return;
    this.aboutAdminService.delete(section.id).subscribe({
      next: () => this.loadAboutSections(),
      error: () => { this.errorMessage = 'Failed to delete About section.'; }
    });
  }

  // ==============================
  // PROFILE METHODS
  // ==============================
  loadProfile(): void {
    this.loadingProfile = true;
    this.profileAdminService.get().subscribe({
      next: (data) => {
        if (data) {
          this.profile = data;
        }
        this.loadingProfile = false;
      },
      error: () => {
        // Provide graceful fallback if not yet initialized, but log error
        this.errorMessage = 'Failed to load Profile. Using defaults.';
        this.loadingProfile = false;
      }
    });
  }

  saveProfile(): void {
    this.loadingProfile = true;
    this.profileSuccessMessage = '';
    this.profileAdminService.save(this.profile).subscribe({
      next: (savedProfile) => {
        this.profile = savedProfile;
        this.profileSuccessMessage = 'Profile saved successfully';
        setTimeout(() => this.profileSuccessMessage = '', 3000);
        this.loadingProfile = false;
      },
      error: () => {
        this.errorMessage = 'Failed to save Profile.';
        this.loadingProfile = false;
      }
    });
  }
}
