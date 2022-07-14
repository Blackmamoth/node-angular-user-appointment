import { Component, OnInit } from '@angular/core';
import { Appointment } from '../appoint-form/Appointment';
import { AppointmentService } from '../appoint-form/appointment.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  constructor(private appointmentServices: AppointmentService) { }

  appointments: Appointment[] = [];

  pageNum: number;
  itemsPerPage: number = 10;

  ngOnInit(): void {
    this.appointmentServices.getAppointmentsData().subscribe(data => {
      this.appointments = data;
    })
  }

  pageChanged(pageNum) {
    this.pageNum = pageNum;
  }

}
