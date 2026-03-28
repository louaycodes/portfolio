import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
  standalone: false
})
export class ImageUploadComponent implements OnInit, OnChanges {
  @Input() folder: string = 'general';
  @Input() currentUrl: string = '';
  @Input() multiple: boolean = false;
  @Output() urlSelected = new EventEmitter<string>();

  uploading = false;
  error = '';
  previewUrl = '';
  urls: string[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.initUrls();
  }

  ngOnChanges(changes: SimpleChanges) {
  if (changes['currentUrl'] && changes['currentUrl'].firstChange) {
    this.initUrls();
  }
}

  initUrls() {
    if (this.multiple && this.currentUrl) {
      this.urls = this.currentUrl.split(',').map(u => u.trim()).filter(u => u.length > 0);
    } else if (this.multiple && !this.currentUrl) {
      this.urls = [];
    }
  }

  get displayUrl(): string {
    return this.previewUrl || this.currentUrl;
  }

  removeImage(index: number): void {
    if (!this.multiple) return;
    this.urls.splice(index, 1);
    this.urlSelected.emit(this.urls.join(','));
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      // Local preview
      if (!this.multiple) {
        const reader = new FileReader();
        reader.onload = (e) => this.previewUrl = e.target?.result as string;
        reader.readAsDataURL(file);
      }

      // Upload state reset
      this.uploading = true;
      this.error = '';

      const credentials = this.authService.getCredentials();
      const headers = new HttpHeaders({ 'Authorization': `Basic ${credentials}` });
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', this.folder);

      this.http.post<{ url: string }>('http://localhost:8080/api/upload', formData, { headers }).subscribe({
        next: (response) => {
          this.uploading = false;
          if (this.multiple) {
            this.urls.push(response.url);
            this.urlSelected.emit(this.urls.join(','));
          } else {
            this.previewUrl = response.url;
            this.urlSelected.emit(response.url);
          }
        },
        error: () => {
          this.uploading = false;
          this.error = 'Upload failed. Please try again.';
        }
      });
    }
  }
}
