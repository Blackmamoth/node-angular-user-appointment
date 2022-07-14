import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointFormComponent } from './appoint-form/appoint-form.component';
import { AppointmentsComponent } from './appointments/appointments.component';

const routes: Routes = [
  { path: '', redirectTo: 'appointments', pathMatch: 'full' },
  { path: 'appointment-form', component: AppointFormComponent },
  { path: 'appointments', component: AppointmentsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
