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

  events: any[] = []

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.appointmentService.getAppointmentsData().subscribe(data => {
      data.forEach(item => {
        this.events.push({ date: item.date_of_appointment.toString().split('T')[0], title: item.appointment_for })
      })
      this.calendarOptions.events = this.events
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
