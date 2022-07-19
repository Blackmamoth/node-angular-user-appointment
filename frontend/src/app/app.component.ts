import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = "Appointments";

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.navigate(['appointments'])
  }

  onAppointmentForm() {
    this.title = "Appointment form"
    this.router.navigate(['appointment-form'])
  }

  onShowAppointments() {
    this.title = "Appointments"
    this.router.navigate(['appointments'])
  }
}