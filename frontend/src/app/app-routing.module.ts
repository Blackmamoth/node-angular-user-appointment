import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointFormComponent } from './appoint-form/appoint-form.component';
import { AddClientComponent } from './appointments/add-client/add-client.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { CalendarComponent } from './appointments/calendar/calendar.component';
import { TableComponent } from './appointments/table/table.component'

const routes: Routes = [
  { path: '', redirectTo: 'appointments', pathMatch: 'full' },
  {
    path: 'appointment-form', component: AppointFormComponent
  },
  {
    path: 'appointments', component: AppointmentsComponent, children: [
      { path: 'table', component: TableComponent },
      { path: 'table/edit/:id', component: AppointFormComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'add-client', component: AddClientComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
