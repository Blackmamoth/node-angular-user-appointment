const mysql = require("mysql2");
const countries = require('../json_data/countries.json')
const states = require('../json_data/states.json')
const cities = require('../json_data/cities.json')
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

const insertCountries = () => {
    countries.forEach(country => {
        const data = [country.name];
        const query = "INSERT INTO np_country_table (name) VALUES (?);";
        db.query(query, data, (err, result) => {
            if (err) throw new Error(err.message);
            console.log("country inserted")

        })
    })
}

const insertStates = () => {
    states.forEach(state => {
        const data = [state.name, state.country_name];
        const query = "INSERT INTO np_state_table (name, country_name) VALUES (?, ?);";
        db.query(query, data, (err, message) => {
            if (err) throw new Error(err.message);
            console.log("state inserted")
        })
    })
}

const insertCity = () => {
    cities.forEach(city => {
        const data = [city.name, city.country_name, city.state_name];
        const query = "INSERT INTO np_city_table (name, country_name, state_name) VALUES (?, ?, ?);";
        db.query(query, data, (err, message) => {
            if (err) throw new Error(err.message);
            console.log("city inserted")
        })
    })
}

connectDB()
//insertCountries()
// insertStates()
insertCity()
