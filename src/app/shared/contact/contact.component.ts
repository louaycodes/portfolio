import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Profile } from '../models/profile.model';

declare const calendar: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  standalone: false,
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit, AfterViewInit {
  profile: Profile | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getProfile().subscribe({
      next: (data) => { this.profile = data; },
      error: () => { this.profile = null; }
    });
  }

  ngAfterViewInit() {
    this.initGoogleCalendar();
  }

  initGoogleCalendar() {
    const checkCalendar = setInterval(() => {
      if (typeof calendar !== 'undefined' && calendar.schedulingButton) {
        clearInterval(checkCalendar);
        calendar.schedulingButton.load({
          url: this.profile?.googleMeetUrl || '',
          color: '#039BE5',
          label: 'Schedule Call',
          target: document.getElementById('contact-google-cal'),
        });
      }
    }, 100);
  }

  getWhatsAppUrl(): string {
  if (!this.profile?.phone) return '';
  const digits = this.profile.phone.replace(/[^0-9]/g, '');
  return 'https://wa.me/' + digits;
}
}
