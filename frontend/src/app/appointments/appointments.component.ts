import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.toTable()
  }

  toTable() {
    this.router.navigate(['/appointments', 'table'])
  }

  toCalendar() {
    this.router.navigate(['/appointments', 'calendar'])
  }

}
