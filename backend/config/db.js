const mysql = require("mysql2");
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

module.exports = { db, connectDB };
