import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Profile } from '../models/profile.model';

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrl: './technologies.component.css'
})
export class TechnologiesComponent implements OnInit {
  profile: Profile | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getProfile().subscribe(data => {
      this.profile = data;
    });
  }
}
