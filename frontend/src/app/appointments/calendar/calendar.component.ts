import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'
import { Appointment } from 'src/app/appoint-form/Appointment';
import { AppointmentService } from 'src/app/appoint-form/appointment.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth'
  }

  appointments: object[] = [];

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.appointmentService.getAppointmentsData().subscribe(data => {
      for (let item of data) {
        let date = item.date_of_appointment;
        let title = item.appointment_for;
        this.appointments.push({ title, date })
      }
      this.calendarOptions.events = [...this.appointments]
    })
  }

}
