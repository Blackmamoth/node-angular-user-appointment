const mysql = require("mysql2");
const codes_json = require("../json_data/country_codes.json");
require("dotenv").config();

const DB = process.env.DB;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

const db = mysql.createConnection({
  host: "localhost",
  user: DB_USER,
  password: DB_PASS,
  database: DB,
});

const connectDB = () => {
  db.connect((err) => {
    if (err) throw new Error(err.message);
    console.log("Connected");
  });
};

const insertCodes = () => {
  codes_json.forEach((obj) => {
    const query =
      "INSERT INTO np_country_code_table (`name`, `dial_code`, `code`) VALUES (?, ?, ?);";
    let data = [obj.name, obj.dial_code, obj.code];
    db.query(query, data, (err, result) => {
      if (err) throw new Error(err.message);
      console.log("Country Code added");
    });
  });
};
//insertCodes();

//connectDB();
