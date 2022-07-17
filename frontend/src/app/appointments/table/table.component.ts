import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Appointment } from 'src/app/appoint-form/Appointment';
import { AppointmentService } from 'src/app/appoint-form/appointment.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private appointmentServices: AppointmentService) { }

  appointments: Appointment[] = [];

  pageNum: number;
  itemsPerPage: number = 10;

  appointFor: string[] = ['Appointment type', 'New Registration', 'Re-Registraion', 'Diet Change']

  searchForm: FormGroup;

  filteredAppointments: Appointment[] = [];
  noFilter: boolean = true;

  ngOnInit(): void {
    this.appointmentServices.getAppointmentsData().subscribe(data => {
      this.appointments = data;
    })

    this.searchForm = new FormGroup({
      'id': new FormControl(null),
      'appointmentFor': new FormControl('Appointment type'),
      'name': new FormControl(null)
    })
  }

  searchFilter() {
    const values = this.searchForm.value;
    console.log(values.name)
    if (values.id === null && values.name === '' && values.appointmentFor === 'Appointment type') {
      this.filteredAppointments = null;
      this.noFilter = true;
      return;
    }

    if (values.id) {
      this.filteredAppointments = this.appointments.filter((appointment) => appointment.npat_id === +values.id)
      this.noFilter = false;
      return;
    }

    if (values.name) {
      const data = this.appointments.filter((appointment) => appointment.name.startsWith(values.name));
      data.forEach(item => this.filteredAppointments.push(item))
    }

    if (values.appointmentFor) {
      const data = this.appointments.filter((appointment) => appointment.appointment_for === values.appointmentFor)
      data.forEach(value => {
        this.filteredAppointments.push(value)
      })
    }

    if (this.filteredAppointments.length > 0) {
      this.noFilter = false;
      const set = new Set(this.filteredAppointments);
      this.filteredAppointments = [...set]
    } else {
      this.noFilter = true;
    }

  }

  pageChanged(pageNum) {
    this.pageNum = pageNum;
  }

}
