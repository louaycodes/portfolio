import { Component, AfterViewInit } from '@angular/core';

declare const calendar: any;

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  standalone: false,
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements AfterViewInit {
  ngAfterViewInit() {
    this.initGoogleCalendar();
  }

  initGoogleCalendar() {
    const checkCalendar = setInterval(() => {
      if (typeof calendar !== 'undefined' && calendar.schedulingButton) {
        clearInterval(checkCalendar);
        
        const workerContainer = document.getElementById('google-cal-worker');
        if (workerContainer) {
            calendar.schedulingButton.load({
                url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0qr_XjHfeiDjM4Excx2QsB5zks_kas15FgTKXXJ37LW39c2k1mRLfynVzW5PtU39NnmPZpbW9G?gv=true',
                color: '#039BE5',
                label: 'Schedule Call',
                target: workerContainer,
            });
        }

        const customBtn = document.querySelector('.cta-calendar-btn');
        let googleBtnRef: any = null;

        const findAndHideGoogleBtn = () => {
            if (googleBtnRef) return;
            const candidates = document.body.querySelectorAll('*');
            for (let i = 0; i < candidates.length; i++) {
                const el = candidates[i] as HTMLElement;
                if (el !== customBtn && customBtn && !customBtn.contains(el) && el.textContent === 'Schedule Call') {
                    el.style.position = 'absolute';
                    el.style.opacity = '0';
                    el.style.pointerEvents = 'none';
                    el.style.zIndex = '-1';
                    googleBtnRef = el;
                    return;
                }
            }
        };

        setInterval(findAndHideGoogleBtn, 500);

        if (customBtn) {
            customBtn.addEventListener('click', () => {
                if (googleBtnRef) {
                    googleBtnRef.click();
                } else {
                    findAndHideGoogleBtn();
                    if (googleBtnRef) googleBtnRef.click();
                }
            });
        }
      }
    }, 100);
  }
}
