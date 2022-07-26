import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'src/app/appoint-form/Appointment';
import { AppointmentService } from 'src/app/appoint-form/appointment.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private appointmentServices: AppointmentService, private router: Router, private route: ActivatedRoute) { }

  appointments: Appointment[] = [];

  pageNum: number;
  itemsPerPage: number = 10;

  appointFor: string[] = ['Appointment type', 'New Registration', 'Re Registraion', 'Diet Change']

  searchForm: FormGroup;

  filteredAppointments: Appointment[] = [];
  noFilter: boolean = true;

  showAlert: boolean = false;
  alertMessage: string = null;
  alertType: string = null;


  ngOnInit(): void {
    this.getAppointments()

    this.searchForm = new FormGroup({
      'id': new FormControl(null),
      'appointmentFor': new FormControl('Appointment type'),
      'name': new FormControl(null),
      'from': new FormControl(null),
      'to': new FormControl(null)
    })

  }

  getAppointments() {
    this.appointmentServices.getAppointmentsData().subscribe(data => {
      this.appointments = data;
    })
  }

  getAppointmentsByDates() {
    const values = this.searchForm.value;
    this.appointmentServices.getAppointmentBetweenDates(values.from, values.to).subscribe((response) => {
      this.filteredAppointments = response
      this.noFilter = false;
      console.log(response)
    })
  }

  searchFilter() {
    const values = this.searchForm.value;
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

    if (values.from && values.to) {
      this.getAppointmentsByDates()
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

  onCloseAlert() {
    this.showAlert = false;
  }

  onDelete(appointment: Appointment) {
    const proceed = confirm("Are you sure you want to delete this appointment?")
    if (proceed) {
      this.appointmentServices.deleteAppointment(appointment.npat_id).subscribe(response => {
        this.getAppointments()
        this.showAlert = true;
        this.alertMessage = response.message;
        this.alertType = 'success'
        setTimeout(() => { this.showAlert = false }, 3000)
      })
    } else {
      return;
    }
  }

  onEdit(appointment: Appointment) {
    const proceed = confirm("Do you want to edit this appointment?")
    if (proceed) {
      this.router.navigate(['edit', appointment.npat_id], { relativeTo: this.route })
    } else {
      return;
    }
  }

  onAddClient(appointment: Appointment) {
    this.router.navigate(['/appointments', 'add-client', appointment.npat_id])
  }

}
