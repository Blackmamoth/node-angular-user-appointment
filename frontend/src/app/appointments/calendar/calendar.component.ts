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
        let total = item.count_diet_change + item.count_new_registration + item.count_re_registration
        this.events.push({ date: item.date_of_appointment.split('T')[0], title: `NR:${item.count_new_registration}` })
        this.events.push({ date: item.date_of_appointment.split('T')[0], title: `RR:${item.count_re_registration}` })
        this.events.push({ date: item.date_of_appointment.split('T')[0], title: `DC:${item.count_diet_change}` })
        this.events.push({ date: item.date_of_appointment.split('T')[0], title: `Available:${15 - total}` })
      })
      this.calendarOptions.events = this.events
    })
  }

  onPopOver(arg) {
    console.log(arg)
  }

}
