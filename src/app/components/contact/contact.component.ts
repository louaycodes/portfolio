import { Component, AfterViewInit } from '@angular/core';

declare const calendar: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  standalone: false,
  styleUrl: './contact.component.css'
})
export class ContactComponent implements AfterViewInit {
  ngAfterViewInit() {
    this.initGoogleCalendar();
  }

  initGoogleCalendar() {
    const checkCalendar = setInterval(() => {
      if (typeof calendar !== 'undefined' && calendar.schedulingButton) {
        clearInterval(checkCalendar);
        calendar.schedulingButton.load({
            url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0qr_XjHfeiDjM4Excx2QsB5zks_kas15FgTKXXJ37LW39c2k1mRLfynVzW5PtU39NnmPZpbW9G?gv=true',
            color: '#039BE5',
            label: 'Schedule Call',
            target: document.getElementById('contact-google-cal'),
        });
      }
    }, 100);
  }
}
