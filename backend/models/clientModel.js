const e = require("express");
const { db } = require("../config/db");

class Client {

  constructor(name, gender, email, dob, mobile_num, country_name, state_name, city_name, address_home, address_office, martial_status, telephone_home, telephone_office, about_client) {
    this.name = name;
    this.gender = gender;
    this.email = email;
    this.dob = new Date(dob);
    this.mobile_num = mobile_num;
    this.country_name = country_name;
    this.state_name = state_name;
    this.city_name = city_name;
    this.address_home = address_home;
    this.address_office = address_office;
    this.martial_status = martial_status;
    this.telephone_home = telephone_home;
    this.telephone_office = telephone_office;
    this.about_client = about_client;
  }


  get clientData() {
    return Object.values(this)
  }

  static checkExistingPhone(phone, currentUserId) {
    if (phone) {
      return new Promise(async (resolve, reject) => {
        const query = "SELECT mobile_num FROM np_client_table WHERE mobile_num = ? AND npct_id != ?;";
        db.query(query, [phone, currentUserId], (err, result) => {
          if (err) {
            reject({ error: true, message: "An error occured while retreiving client data" });
            return;
          }
          if (result.length) {
            reject({ error: true, message: "This phone number is already registered to a different client's account" })
            return;
          }
          resolve({ success: true })
        })
      })
    }
    return { success: true }
  }

  static checkExistingEmail(email, currentUserId) {
    if (email) {
      return new Promise(async (resolve, reject) => {
        const query = "SELECT email FROM np_client_table WHERE email = ? AND npct_id != ?;";
        db.query(query, [email, currentUserId], (err, result) => {
          if (err) {
            reject({ error: true, message: "An error occured while retreiving client data" });
            return;
          }
          if (result.length) {
            reject({ error: true, message: "This email address is already registered to a different client's account" })
            return;
          }
          resolve({ success: true })
        })
      })
    }
    return { success: true }
  }

  async validatePhone() {
    const pattern = /^\d{10}$/;
    if (!pattern.test(this.mobile_num)) {
      return { error: true, message: "Please provide a valid phone number with exactly 10 digits only" };
    }
    const phone = await Client.getClientByPhone(this.mobile_num);
    if (phone) {
      return { error: true, message: "The provided phone number is already registered to an existing client" }
    }
    return true;
  }

  async validateEmail() {
    const pattern = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
    if (!pattern.test(this.email)) {
      return { error: true, message: "Please provide a valid email" };
    }
    const email = await Client.getClientByEmail(this.email);
    if (!email) {
      return { error: true, message: "The provided email is already registered to an existing client" }
    }
    return true;
  }

  addClient() {
    return new Promise(async (resolve, reject) => {
      const query = "INSERT INTO np_client_table (name, gender, email, dob, mobile_num, country_name, state_name, city_name, address_home, address_office, telephone_home, telephone_office, martial_status, about_client) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      const email = await this.validateEmail();
      if (email.error) {
        reject(email);
        return;
      }
      const checkPhone = await this.validatePhone();
      if (checkPhone.error) {
        reject(checkPhone);
        return;
      }
      db.query(query, this.clientData, (err, result) => {
        if (err) {
          reject({ success: false, message: "An error occured while enrolling client" });
          return;
        }
        if (result.affectedRows === 1) {
          resolve({ success: false, message: "Client enrolled successfully" });
          return;
        }
        reject({ success: false, message: "An error occured while enrolling client" });
      })
    })
  }

  static updateClientData(id, clientData) {
    return new Promise(async (resolve, reject) => {
      let client, data = [];
      try {
        client = await Client.getClientById(id);
      } catch (error) {
        reject({ error: true, message: error.message })
        return;
      }
      const name = clientData.name || client.name;
      data.push(name);
      const gender = clientData.gender || client.gender;
      data.push(gender);
      const email = clientData.email || client.email;
      data.push(email);
      const dob = clientData.dob || client.dob;
      data.push(dob);
      const mobile_num = clientData.mobile_num || client.mobile_num;
      data.push(mobile_num);
      const country_name = clientData.country_name || client.country_name;
      data.push(country_name);
      const state_name = clientData.state_name || client.state_name;
      data.push(state_name);
      const city_name = clientData.city_name || client.city_name;
      data.push(city_name);
      const address_home = clientData.address_home || client.address_home;
      data.push(address_home);
      const address_office = clientData.address_office || client.address_office;
      data.push(address_office);
      const telephone_home = clientData.telephone_home || client.telephone_home;
      data.push(telephone_home);
      const telephone_office = clientData.telephone_office || client.telephone_office;
      data.push(telephone_office);
      const martial_status = clientData.martial_status || client.martial_status;
      data.push(martial_status);
      const about_client = clientData.about_client || client.about_client;
      data.push(about_client);
      data.push(id);
      try {
        const checkPhone = await Client.checkExistingPhone(mobile_num, client.npct_id);
      } catch (error) {
        reject(error);
        return;
      }
      try {
        const checkEmail = await Client.checkExistingEmail(email, client.npct_id);
      } catch (err) {
        reject(err);
        return;
      }
      const query = "UPDATE np_client_table SET name = ?, gender = ?, email = ?, dob = ?, mobile_num = ?, country_name = ?, state_name = ?, city_name = ?, address_home = ?, address_office = ?, telephone_home = ?, telephone_office = ?, martial_status = ?, about_client = ? WHERE int_delete_flag = 0 and npct_id = ?;";
      db.query(query, data, (err, result) => {
        if (err) {
          reject({ error: true, message: "An error occured while updating client data" });
          return;
        }
        if (result.info.split(": ")[1][0] === '1') {
          resolve({ success: true, message: "Client data successfully updated" });
          return;
        }
        reject({ error: true, message: "An error occured while updating client data" });
      })

    })
  }

  static getClients() {
    return new Promise((resolve, reject) => {
      const query = "SELECT npct_id AS id, name ,gender, email, dob, mobile_num, country_name, state_name, city_name, address_home, address_office, telephone_home, telephone_office, martial_status, about_client FROM np_client_table WHERE int_delete_flag = 0;";
      db.query(query, (err, result) => {
        if (err) {
          reject({ error: trur, message: "An error occured while retreiving clients data" });
          return;
        }
        resolve(result);
      })
    })
  }

  static getClientById(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT npct_id AS id, name ,gender, email, dob, mobile_num, country_name, state_name, city_name, address_home, address_office, telephone_home, telephone_office, martial_status, about_client FROM np_client_table WHERE int_delete_flag = 0 and npct_id = ?;"
      db.query(query, [id], (err, result) => {
        if (err) {
          reject({ error: true, message: "An error occured while retreiving client data" });
          return;
        }
        if (result.length) {
          resolve(result[0]);
        } else {
          reject({ error: true, message: "Client with that id not found" })
        }
      })
    })
  }

  static getClientByPhone(phone) {
    return new Promise((resolve, reject) => {
      const query = "SELECT npct_id AS id, name,gender, email, dob, mobile_num, country_name, state_name, city_name, address_home, address_office, telephone_home, telephone_office, martial_status, about_client FROM np_client_table WHERE int_delete_flag = 0 and mobile_num = ?;"
      db.query(query, [phone], (err, result) => {
        if (err) {
          reject({ error: true, message: "An error occured while retreiving client data" });
          return;
        }
        if (!result[0]) {
          reject({ error: true, message: `Cannot find client with phone number ${phone}` })
          return;
        }
        resolve(result[0])
      })
    })
  }

  static getClientByEmail(email) {
    return new Promise((resolve, reject) => {
      const query = "SELECT npct_id AS id, name,gender, email, dob, mobile_num, country_name, state_name, city_name, address_home, address_office, telephone_home, telephone_office, martial_status, about_client FROM np_client_table WHERE int_delete_flag = 0 and email = ?;"
      db.query(query, [phone], (err, result) => {
        if (err) {
          reject({ error: true, message: "An error occured while retreiving client data" });
          return;
        }
        if (!result[0]) {
          reject({ error: true, message: `Cannot find client with email ${email}` })
          return;
        }
        resolve(result[0])
      })
    })
  }

}

module.exports = Client;
