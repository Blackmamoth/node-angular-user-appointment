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
    date_of_appointment,
    user_id
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
    this.user_id = user_id;
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
      this.user_id,
      this.user_id,
    ];
  }

  checkIfMobileNumsEqual() {
    if (this.mobile_num === this.alternate_mobile_num) {
      return true;
    }
    return false;
  }

  checkSlots() {
    return new Promise((resolve, reject) => {
      const dayAfter = new Date(this.date_of_appointment);
      dayAfter.setDate(dayAfter.getDate() + 1);
      const dates = [
        this.date_of_appointment.toISOString().split("T")[0],
        dayAfter.toISOString().split("T")[0],
      ];
      const query =
        "SELECT COUNT(npat_id) AS count FROM np_appointment_table WHERE  int_delete_flag = 0 AND date_of_appointment BETWEEN ? AND ?;";
      db.query(query, dates, (err, results) => {
        if (err) {
          reject(err.message);
          return;
        }
        const count = results[0]["count"];
        if (count >= 15) {
          reject(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  static getHolidays() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM np_holidays_table;";
      db.query(query, (err, result) => {
        if (err) {
          reject(err.message);
          return;
        }
        resolve(result);
      });
    });
  }

  async checkHolidays() {
    const holidays = await Appointment.getHolidays();
    const date = this.date_of_appointment
      .toLocaleDateString()
      .replace("/", "-");
    for (let i = 0; i < holidays.length; i++) {
      if (holidays[i].date === date) {
        console.log(holidays[i].date);
        return true;
      }
    }
    return false;
  }

  static getAppointmentsBetweenDates(date1, date2) {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT * FROM `np_appointment_table` WHERE int_delete_flag = 0 AND DATE(date_of_appointment) BETWEEN ? AND ?;";
      const dates = [date1, date2];
      db.query(query, dates, (err, results) => {
        if (err) {
          reject(err.message);
          return;
        }
        resolve(results);
      });
    });
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

  static registrationCounts() {
    return new Promise(async (resolve, reject) => {
      const query =
        "SELECT COUNT(npat_id) AS 'total_appointment_count', COUNT( CASE WHEN appointment_for = 'Re Registration' THEN npat_id END ) AS count_re_registration, COUNT( CASE WHEN appointment_for = 'Diet Change' THEN npat_id END ) AS count_diet_change, COUNT( CASE WHEN appointment_for = 'New Registration' THEN npat_id END ) AS count_new_registration, DATE(date_of_appointment) as 'date_of_appointment' FROM np_appointment_table WHERE int_delete_flag = 0 GROUP BY DATE(date_of_appointment);";
      db.query(query, (err, result) => {
        if (err) throw new Error(err.message);
        resolve(result);
      });
    });
  }

  static getAppointments() {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT * FROM np_appointment_table WHERE int_delete_flag = 0 ORDER BY date_of_appointment;";
      db.query(query, (err, results) => {
        if (err) reject(err.message);
        resolve(results);
      });
    });
  }

  static getAppointment(id) {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT * FROM np_appointment_table WHERE npat_id = ? AND int_delete_flag = 0;";
      db.query(query, [id], (err, results) => {
        if (err) reject(err.message);
        if (results.length > 0) {
          resolve(results[0]);
        } else {
          reject("Appointment not found");
        }
      });
    });
  }

  static deleteAppointment(id) {
    return new Promise(async (resolve, reject) => {
      let appointment;
      try {
        appointment = await Appointment.getAppointment(id);
      } catch (error) {
        reject("Appointment not found");
        return;
      }
      const query =
        "UPDATE `np_appointment_table` SET `int_delete_flag` = 1 WHERE npat_id = ?;";
      db.query(query, [id], (err, result) => {
        if (err) {
          reject({ success: false, error: err.message });
          return;
        }
        resolve({ success: true, message: "Appointment deleted successfully" });
      });
    });
  }

  static updateAppointment(id, appointment_data) {
    return new Promise(async (resolve, reject) => {
      let appointment;
      try {
        appointment = await Appointment.getAppointment(id);
      } catch (error) {
        reject("Appointment not found");
        return;
      }
      const country_code = appointment_data.country_code
        ? appointment_data.country_code
        : appointment.country_code;
      const mobile_num = appointment_data.mobile_num
        ? appointment_data.mobile_num
        : appointment.mobile_num;
      const alternate_mobile_num = appointment_data.alternate_mobile_num
        ? appointment_data.alternate_mobile_num
        : appointment.alternate_mobile_num;
      const name = appointment_data.name
        ? appointment_data.name
        : appointment.name;
      const email = appointment_data.email
        ? appointment_data.email
        : appointment.email;
      const client_type = appointment_data.client_type
        ? appointment_data.client_type
        : appointment.client_type;
      const appointment_for = appointment_data.client_type
        ? appointment_data.client_type
        : appointment.client_type;
      const package_name = appointment_data.package_name
        ? appointment_data.package_name
        : appointment.package;
      const date_of_appointment = appointment_data.date_of_appointment
        ? appointment_data.date_of_appointment
        : appointment.date_of_appointment;
      const data = [
        country_code,
        mobile_num,
        alternate_mobile_num,
        name,
        email,
        client_type,
        appointment_for,
        package_name,
        date_of_appointment,
        id,
      ];
      const query =
        "UPDATE `np_appointment_table` SET `country_code` = ?, `mobile_num` = ?, `alternate_mobile_num` = ?, `name` = ?, `email` = ?, `client_type` = ?, `appointment_for` = ?, `package` = ?, `date_of_appointment` = ? WHERE int_delete_flag = 0 AND npat_id = ?;";
      db.query(query, data, (err, result) => {
        if (err) {
          reject(err.message);
          return;
        }
        resolve({ message: "Appointment updated successfully", success: true });
      });
    });
  }

  static addClient(user_id, appointment_id) {
    return new Promise((resolve, reject) => {
      const query =
        "UPDATE `np_appointment_table` SET  `added_user_id` = ? WHERE `npat_id` = ? AND `int_delete_flag` = 0;";
      db.query(query, [user_id, appointment_id], (err, result) => {
        if (err) {
          reject("Error while adding client to appointment");
          return;
        }
        resolve("Client successfully added to the appointment");
      });
    });
  }

  async checkBusyDates() {
    const today = new Date();
    if (today.toDateString() === this.date_of_appointment.toDateString()) {
      return {
        message:
          "You can only set an appointment atleast a day before the date of appointment",
        success: false,
      };
    }
    if (this.date_of_appointment.getTime() < today.getTime()) {
      return {
        message: "You cannot set appointments in the past",
        success: false,
      };
    }
    if (this.date_of_appointment.getHours() > 20) {
      return {
        message: "You can only set appointment before 9PM",
        success: false,
      };
    }
    if (this.date_of_appointment.getHours() < 9) {
      return {
        message:
          "Office opens at 9AM in the morning, you can only set appointment after that",
        success: false,
      };
    }
    const appointments = await Appointment.getAppointments();
    for (let appointment of appointments) {
      if (
        appointment.date_of_appointment.getDate() ===
          this.date_of_appointment.getDate() &&
        appointment.date_of_appointment.getHours() ===
          this.date_of_appointment.getHours()
      ) {
        if (
          appointment.date_of_appointment.getMinutes() ===
          this.date_of_appointment.getMinutes()
        ) {
          return {
            message:
              "The date and time of appointment you have chosen is already busy",
            success: false,
          };
        }
      }
    }
    return { success: true };
  }

  setAppointment() {
    console.log(this.date_of_appointment);
    return new Promise(async (resolve, reject) => {
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
      const validDate = await this.checkBusyDates();
      if (validDate.success === false) {
        reject(validDate.message);
        return;
      }
      if (!this.checkSlots()) {
        reject(
          `Appointment slots for date ${this.date_of_appointment.toLocaleDateString()} are full`
        );
        return;
      }
      if (await this.checkHolidays()) {
        reject("The day you're trying to set an appointment on is a holiday");
        return;
      }
      const query =
        "INSERT INTO np_appointment_table (`country_code`, `mobile_num`, `alternate_mobile_num`, `name`, `email`, `client_type`, `appointment_for`, `package`, `date_of_appointment`, `user_id`, `added_user_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
      db.query(query, this.values, (err, results) => {
        if (err) {
          reject({ error: err.message, success: false });
          return;
        }
        resolve("Appointment successfully arranged");
      });
    });
  }
}

module.exports = Appointment;
