const { db } = require('../config/db')

class Address {
    static getCountries() {
        return new Promise((resolve, reject) => {
            const query = "SELECT name FROM np_country_table;";
            db.query(query, (err, results) => {
                if (err) throw new Error(err.message);
                resolve(results);
            })
        })
    }

    static getStates(country_name) {
        return new Promise((resolve, reject) => {
            const query = "SELECT name FROM np_state_table WHERE country_name = ?;";
            db.query(query, [country_name], (err, results) => {
                if (err) throw new Error(err.message);
                resolve(results);
            })
        })
    }

    static getCities(country_name, state_name) {
        return new Promise((resolve, reject) => {
            const query = "SELECT name FROM np_city_table WHERE country_name = ? AND state_name = ?;";
            db.query(query, [country_name, state_name], (err, results) => {
                if (err) throw new Error(err.message);
                resolve(results);
            })
        })
    }

}

module.exports = Address