const mysql = require("mysql2");
const holidaysJson = require("../json_data/holidays.json");
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

const insertHolidays = () => {
  holidaysJson.holidays.forEach((holiday) => {
    const data = [holiday.date, holiday.title];
    const query =
      "INSERT INTO np_holidays_table (`date`, `title`) VALUES (?, ?);";
    db.query(query, data, (err, result) => {
      if (err) throw new Error(err.message);
      console.log("Holiday Inserted");
    });
  });
};

// connectDB();

// insertHolidays();
