import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppointFormComponent } from './appoint-form/appoint-form.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './appointments/table/table.component';
import { CalendarComponent } from './appointments/calendar/calendar.component';
import { AddClientComponent } from './appointments/add-client/add-client.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
])

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AppointFormComponent,
    AppointmentsComponent,
    TableComponent,
    CalendarComponent,
    AddClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    FullCalendarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
