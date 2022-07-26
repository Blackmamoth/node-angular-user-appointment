import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppointmentService } from 'src/app/appoint-form/appointment.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private appointmentServices: AppointmentService) { }

  packages: string[] = ['1M', '2M', '3M', '4M', '5M', '6M', '7M', '8M', '9M', '10M', '11M', '12M']

  addClientForm: FormGroup;

  appointmentID: number = 0;

  showAlert: boolean = false;
  alertMessage: string = null;
  alertType: string = null;


  ngOnInit(): void {
    this.addClientForm = new FormGroup({
      'mobile_num': new FormControl(null, [Validators.required, this.tenDigitsPhoneNumber.bind(this)]),
      'alternate_mobile_num': new FormControl(null, [Validators.required, this.tenDigitsPhoneNumber.bind(this)]),
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'package_name': new FormControl(this.packages[0], Validators.required)
    })

    this.route.params.subscribe((params: Params) => {
      this.appointmentID = +params['id']
    })

  }

  tenDigitsPhoneNumber(control: FormControl): { [s: string]: boolean } {
    const value = String(control.value)
    if (value.length !== 10) {
      return { '10DigitsOnly': true }
    }
    return null;
  }

  onCloseAlert() {
    this.showAlert = false;
  }

  clearAlert() {
    setTimeout(() => {
      this.showAlert = false;
      this.alertMessage = null;
      this.alertType = null;
      this.router.navigate(['/appointments', 'table'])
    }, 2000)
  }

  onAddClient() {
    let data = this.addClientForm.value;
    data = {...data, mobile_num: String(data.mobile_num), alternate_mobile_num: String(data.alternate_mobile_num), appointmentID :this.appointmentID}
    this.appointmentServices.addClientToAppointment(data).subscribe(response => {
      if (response) {
        this.alertMessage = String(response);
        this.alertType = "success";
        this.showAlert = true;
        this.clearAlert()
        this.addClientForm.reset();
      }
    }, (err) => {
      this.alertMessage = err.error.message;
      this.alertType = "danger";
      this.showAlert = true;
      this.clearAlert()
    })
  }

}
