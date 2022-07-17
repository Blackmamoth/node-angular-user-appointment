import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from './Appointment';



@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "/api/appointments/"

  countryCodeJsonUrl: string = "https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  getCountryCodes(): Observable<any[]> {
    return this.http.get<any[]>(this.countryCodeJsonUrl);
  }

  getAppointmentsData(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.baseUrl, this.httpOptions);
  }

  setAppointment(data): Observable<Appointment> {
    return this.http.post<Appointment>(this.baseUrl, data, this.httpOptions);
  }

}
