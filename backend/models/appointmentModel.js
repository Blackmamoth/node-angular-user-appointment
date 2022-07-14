const { db } = require("../config/db");

class Appointment {
  constructor(
    country_code,
    mobile_num,
    alternate_mobile_num,
    name,
    email,
    client_type,
    appointment_for,
    package_name,
    date_of_appointment
  ) {
    this.country_code = country_code;
    this.mobile_num = mobile_num;
    this.alternate_mobile_num = alternate_mobile_num;
    this.name = name;
    this.email = email;
    this.client_type = client_type;
    this.appointment_for = appointment_for;
    this.package_name = package_name;
    this.date_of_appointment = new Date(date_of_appointment);
  }

  get values() {
    return [
      this.country_code,
      this.mobile_num,
      this.alternate_mobile_num,
      this.name,
      this.email,
      this.client_type,
      this.appointment_for,
      this.package_name,
      this.date_of_appointment,
    ];
  }

  checkIfMobileNumsEqual() {
    if (this.mobile_num === this.alternate_mobile_num) {
      return true;
    }
    return false;
  }

  validateMobileNumAndAlternateNum() {
    const pattern = /\d{10}/; // pattern to check if the mobile num and alternate mobile num have 10 digits
    if (
      pattern.test(this.mobile_num) &&
      pattern.test(this.alternate_mobile_num)
    ) {
      return true;
    }
    return false;
  }

  validateEmail() {
    const pattern = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/; // pattern to validate email
    // an email can contain letters a-zA-Z or digits 0-9 or special character before and after '@'
    if (pattern.test(this.email)) {
      return true;
    }
    return false;
  }

  static getAppointments() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM np_appointment_table ORDER BY date_of_appointment;";
      db.query(query, (err, results) => {
        if (err) throw new Error(err.message);
        resolve(results);
      });
    });
  }

  static getAppointment(id) {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT * FROM np_appointment_table WHERE npat_id = ? LIMIT 1;";
      db.query(query, [id], (err, results) => {
        if (err) throw new Error(err.message);
        resolve(results[0]);
      });
    });
  }

  async checkBusyDates() {
    const appointments = await Appointment.getAppointments();
    for (let appointment of appointments) {
      console.log(appointment.date_of_appointment);
    }
  }

  setAppointment() {
    return new Promise((resolve, reject) => {
      if (this.checkIfMobileNumsEqual()) {
        reject("Mobile number and alternate mobile number should be different");
        return;
      }
      if (!this.validateMobileNumAndAlternateNum()) {
        reject(
          "Mobile number and alternate mobile number must contain 10 digits only"
        );
        return;
      }
      if (!this.validateEmail()) {
        reject("Please provide a valid email address");
        return;
      }
      const query =
        "INSERT INTO np_appointment_table (`country_code`, `mobile_num`, `alternate_mobile_num`, `name`, `email`, `client_type`, `appointment_for`, `package`, `date_of_appointment`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
      db.query(query, this.values, (err, results) => {
        if (err) {
          reject(err.message);
          return;
        }
        resolve("Appointment successfully arranged");
      });
    });
  }
}

module.exports = Appointment;
