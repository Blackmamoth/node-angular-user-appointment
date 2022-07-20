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
  }

  appointments: object[] = [];

  events: { date: string, title: string }[] = []

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.appointmentService.getRegistrationCount().subscribe((response) => {
      response.forEach(item => {
        this.events.push({ date: item.Date.split('T')[0], title: `${item['Appointment Type']} = ${item.Count}` })
      })
      this.calendarOptions.events = this.events
    })
  }

  setEvents() {
    const array: { date: string, title: string }[] = [];
    const dates: string[] = [];
    this.appointmentService.getAppointmentsData().subscribe(data => {
      data.forEach(item => {
        array.push({ date: item.date_of_appointment.toString(), title: item.appointment_for });
        dates.push()
      })
    })
    console.log(array)
  }

}
