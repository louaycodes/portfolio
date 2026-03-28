import { Component, AfterViewInit } from '@angular/core';

declare const initHeroTerminalTyping: any;
declare const initLifeTyping: any;
declare const initEditor: any;
declare const initCarousel: any;
declare const initScrollAnimations: any;
declare const initTechnologiesSearch: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: false,
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  ngAfterViewInit() {
    setTimeout(() => {
      // Terminal typing is handled by HeroComponent after API responds
      if (typeof initEditor === 'function') initEditor();
      if (typeof initCarousel === 'function') initCarousel();
      if (typeof initScrollAnimations === 'function') initScrollAnimations();
      if (typeof initTechnologiesSearch === 'function') initTechnologiesSearch();
      
      this.initSmoothScroll();
    }, 100);
  }

  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e: any) => {
            const targetAttr = e.currentTarget.getAttribute('href');
            if(!targetAttr || targetAttr === '#') return;
            e.preventDefault();
            const target = document.querySelector(targetAttr);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
  }
}
