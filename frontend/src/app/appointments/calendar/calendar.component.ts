import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DateEnv } from '@fullcalendar/angular'
import { AppointmentService } from 'src/app/appoint-form/appointment.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    eventClick: this.handleEventClick.bind(this)
  }

  dates: string[] = [];
  appointFor: string[] = ['NR', 'RR', 'DC']
  counts: any[] = [];

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.appointmentService.getRegistrationCount().subscribe(response => {
      this.calendarOptions.events = response
    })
  }

  handleEventClick(arg) {
    const date = new Date(arg.event.start);
    const appointmentFor = arg.event._def.title;
    const localDate = date.toLocaleDateString();
    const localTime = date.toLocaleTimeString();
    alert(`Appointment for ${appointmentFor} on ${localDate} at ${localTime}`);
  }

}
