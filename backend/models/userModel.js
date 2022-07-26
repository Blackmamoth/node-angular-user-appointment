const { db } = require("../config/db");

class User {
  constructor(name, email, mobile_num, alternate_mobile_num, package_name) {
    this.name = name;
    this.email = email;
    this.mobile_num = mobile_num;
    this.alternate_mobile_num = alternate_mobile_num;
    this.package_name = package_name;
  }

  get userData() {
    return [
      this.name,
      this.email,
      this.mobile_num,
      this.alternate_mobile_num,
      this.package_name,
    ];
  }

  async checkUserInfo() {
    const checkEmail = await User.findUserByEmail(this.email);
    if (checkEmail) {
      return { success: false, message: "Email already in user" };
    }
    const checkPhone = await User.findUserByPhone(this.mobile_num);
    if (checkPhone) {
      return { success: false, message: "Mobile number already in user" };
    }
    return { success: true };
  }

  addUser() {
    return new Promise(async (resolve, reject) => {
      const query =
        "INSERT INTO np_user_table (`name`, `email`, `mobile_num`, `alternate_mobile_num`, `package`) VALUES (?,?,?,?,?);";
      const checkUser = await this.checkUserInfo();
      if (!checkUser.success) {
        reject(checkUser.message);
        return;
      }
      db.query(query, this.userData, (err, result) => {
        if (err) {
          reject({ success: false, error: err.message });
          return;
        }
        resolve({ success: true, message: "User successfully added" });
      });
    });
  }

  static findUserById(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM np_user_table WHERE nput_id = ?;";
      db.query(query, this.userData, (err, result) => {
        if (err) {
          reject({ success: false, error: err.message });
          return;
        }
        resolve({ success: true, message: result[0] });
      });
    });
  }

  static findUserByName(name) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM np_user_table WHERE name = ?;";
      db.query(query, [name], (err, result) => {
        if (err) {
          reject(err.message);
          return;
        }
        resolve(result[0]);
      });
    });
  }

  static findUserByEmail(email) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM np_user_table WHERE email = ?;";
      db.query(query, [email], (err, result) => {
        if (err) {
          reject(err.message);
          return;
        }
        resolve(result[0]);
      });
    });
  }

  static findUserByPhone(phone) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM np_user_table WHERE mobile_num = ?;";
      db.query(query, [phone], (err, result) => {
        if (err) {
          reject(err.message);
          return;
        }
        resolve(result[0]);
      });
    });
  }
}

module.exports = User;
