import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { HeroComponent } from './hero/hero.component';
import { StatsComponent } from './stats/stats.component';
import { AboutComponent } from './about/about.component';
import { ProjectsPreviewComponent } from './projects-preview/projects-preview.component';
import { TechnologiesComponent } from './technologies/technologies.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { ProjectService } from './services/project.service';

@NgModule({
  declarations: [
    NavbarComponent,
    HeroComponent,
    StatsComponent,
    AboutComponent,
    ProjectsPreviewComponent,
    TechnologiesComponent,
    ContactComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    HeroComponent,
    StatsComponent,
    AboutComponent,
    ProjectsPreviewComponent,
    TechnologiesComponent,
    ContactComponent,
    FooterComponent
  ],
  providers: [
    ProjectService
  ]
})
export class SharedModule { }
