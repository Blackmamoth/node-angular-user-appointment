import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from './appointment.service';
import { Appointment } from './Appointment'
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-appoint-form',
  templateUrl: './appoint-form.component.html',
  styleUrls: ['./appoint-form.component.css']
})
export class AppointFormComponent implements OnInit {

  countryCodes = []
  appointmentForm: FormGroup;
  existingUser: boolean = false;

  clientTypes: string[] = ['Celebrity', 'Celebrity + Private', 'Normal', 'Normal + Private', 'VIP']
  appointFor: string[] = ['New Registration', 'Re Registration', 'Diet Change']
  packages: string[] = ['1M', '2M', '3M', '4M', '5M', '6M', '7M', '8M', '9M', '10M', '11M', '12M']

  showAlert: boolean = false;
  alertMessage: string = null;
  alertType: string = null;

  editMode: boolean = false;
  appointment_id: number;

  constructor(private appointmentServices: AppointmentService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.appointmentServices.getCountryCodes().subscribe((dataArray) => {
      dataArray.forEach(data => this.countryCodes.push(data.dial_code))
    })

    this.appointmentForm = new FormGroup({
      'country_code': new FormControl(null, Validators.required),
      'mobile_num': new FormControl(null, [Validators.required, this.tenDigitsPhoneNumber.bind(this)]),
      'alternate_mobile_num': new FormControl(null, [Validators.required, this.tenDigitsPhoneNumber.bind(this), this.checkMobileNumAndAlternateNum.bind(this)]),
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'client_type': new FormControl(null, Validators.required),
      'appointment_for': new FormControl(null, Validators.required),
      'package_name': new FormControl(null, Validators.required),
      'date_of_appointment': new FormControl(null, Validators.required)
    })

    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.editMode = true
        this.appointment_id = +params['id']
      }
      if (this.editMode) {
        this.appointmentServices.getAppointmentDate(this.appointment_id).subscribe(response => {
          const appointment = response.message;
          let date = new Date(appointment.date_of_appointment).toISOString().split(':00.')[0]
          this.appointmentForm.patchValue({ ...appointment, 'date_of_appointment': date, 'package_name': appointment.package, 'appointment_for': appointment.appointment_for })
        })
      }
    })
  }

  clearAlert() {
    setTimeout(() => {
      this.showAlert = false;
      this.alertMessage = null;
      this.alertType = null;
      this.router.navigate(['/appointments'])
    }, 2000)
  }

  onAppoint() {
    const data: Appointment = { ...this.appointmentForm.value, mobile_num: String(this.appointmentForm.value.mobile_num), alternate_mobile_num: String(this.appointmentForm.value.alternate_mobile_num) };
    if (!this.editMode) {
      this.appointmentServices.setAppointment(data).subscribe((response) => {
        if (response) {
          this.alertMessage = String(response);
          this.alertType = "success";
          this.showAlert = true;
          this.clearAlert()
          this.appointmentForm.reset();
        }
      }, (err) => {
        this.alertMessage = err.error.message;
        this.alertType = "danger";
        this.showAlert = true;
        this.clearAlert()
      })
    } else {
      data.npat_id = this.appointment_id
      this.appointmentServices.updateAppointment(data).subscribe((response) => {
        this.showAlert = true;
        this.alertMessage = response.message;
        this.alertType = "success"
        this.clearAlert()
      }, (err) => {
        this.alertMessage = err.error.message;
        this.alertType = "danger";
        this.showAlert = true;
        this.clearAlert()
      })
    }
  }

  checkExistingUser() {
    const mobile_num = this.appointmentForm.get('mobile_num').value;
    let appointment: Appointment;
    this.appointmentServices.getAppointmentsData().subscribe(data => {
      appointment = data.filter(item => item.mobile_num === mobile_num.toString())[0];
      if (appointment) {
        appointment = { country_code: appointment.country_code, mobile_num: appointment.mobile_num, alternate_mobile_num: appointment.alternate_mobile_num, name: appointment.name, email: appointment.email, client_type: appointment.client_type, appointment_for: 'Re Registration', package_name: appointment.package, date_of_appointment: null };
        this.appointmentForm.patchValue(appointment)
        this.appointFor = this.appointFor.filter(item => item != 'New Registration')
      }
    })
  }

  tenDigitsPhoneNumber(control: FormControl): { [s: string]: boolean } {
    const value = String(control.value)
    if (value.length !== 10) {
      return { '10DigitsOnly': true }
    }
    return null;
  }

  checkMobileNumAndAlternateNum(control: FormControl): { [s: string]: boolean } {
    if (control.value) {
      const alternateNum = String(control.value);
      const mobileNum = String(this.appointmentForm.get('mobile_num').value);
      if (alternateNum === mobileNum) {
        return { 'numsCannotBeSame': true }
      }
    }
    return null
  }

  onCloseAlert() {
    this.showAlert = false;
  }

}
