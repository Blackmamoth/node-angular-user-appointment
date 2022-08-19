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
    return [this.name, this.gender, this.email, this.dob, this.mobile_num, this.country_name, this.state_name, this.city_name, this.address_home, this.address_office, this.telephone_home, this.telephone_office, this.martial_status, this.about_client]
  }

  validateEmail() {
    const pattern = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
    if (!pattern.test(this.email)) {
      return false;
    }
    return true;
  }

  addClient() {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO np_client_table (name, gender, email, dob, mobile_num, country_name, state_name, city_name, address_home, address_office, telephone_home, telephone_office, martial_status, about_client) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      if (!this.validateEmail()) {
        reject({ success: false, message: "Please provide a valid email" })
        return;
      }
      db.query(query, this.clientData, (err, result) => {
        if (err) {
          console.log(err)
          reject({ success: false, message: "An error occured while enrolling client" });
          return;
        }
        resolve({ success: false, message: "Client enrolled successfully" })
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
        resolve(result[0]);
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
        resolve(result[0]);
      })
    })
  }

}

// class User {
//   constructor(name, email, mobile_num, alternate_mobile_num, package_name) {
//     this.name = name;
//     this.email = email;
//     this.mobile_num = mobile_num;
//     this.alternate_mobile_num = alternate_mobile_num;
//     this.package_name = package_name;
//   }

//   get userData() {
//     return [
//       this.name,
//       this.email,
//       this.mobile_num,
//       this.alternate_mobile_num,
//       this.package_name,
//     ];
//   }

//   async checkUserInfo() {
//     const checkEmail = await User.findUserByEmail(this.email);
//     if (checkEmail) {
//       return { success: false, message: "Email already in user" };
//     }
//     const checkPhone = await User.findUserByPhone(this.mobile_num);
//     if (checkPhone) {
//       return { success: false, message: "Mobile number already in user" };
//     }
//     return { success: true };
//   }

//   addUser() {
//     return new Promise(async (resolve, reject) => {
//       const query =
//         "INSERT INTO np_user_table (`name`, `email`, `mobile_num`, `alternate_mobile_num`, `package`) VALUES (?,?,?,?,?);";
//       const checkUser = await this.checkUserInfo();
//       if (!checkUser.success) {
//         reject(checkUser.message);
//         return;
//       }
//       db.query(query, this.userData, (err, result) => {
//         if (err) {
//           reject({ success: false, error: err.message });
//           return;
//         }
//         resolve({ success: true, message: "User successfully added" });
//       });
//     });
//   }

//   static findUserById(id) {
//     return new Promise((resolve, reject) => {
//       const query = "SELECT * FROM np_user_table WHERE nput_id = ?;";
//       db.query(query, this.userData, (err, result) => {
//         if (err) {
//           reject({ success: false, error: err.message });
//           return;
//         }
//         resolve({ success: true, message: result[0] });
//       });
//     });
//   }

//   static findUserByName(name) {
//     return new Promise((resolve, reject) => {
//       const query = "SELECT * FROM np_user_table WHERE name = ?;";
//       db.query(query, [name], (err, result) => {
//         if (err) {
//           reject(err.message);
//           return;
//         }
//         resolve(result[0]);
//       });
//     });
//   }

//   static findUserByEmail(email) {
//     return new Promise((resolve, reject) => {
//       const query = "SELECT * FROM np_user_table WHERE email = ?;";
//       db.query(query, [email], (err, result) => {
//         if (err) {
//           reject(err.message);
//           return;
//         }
//         resolve(result[0]);
//       });
//     });
//   }

//   static findUserByPhone(phone) {
//     return new Promise((resolve, reject) => {
//       const query = "SELECT * FROM np_user_table WHERE mobile_num = ?;";
//       db.query(query, [phone], (err, result) => {
//         if (err) {
//           reject(err.message);
//           return;
//         }
//         resolve(result[0]);
//       });
//     });
//   }
// }

module.exports = Client;
