const { db } = require('../config/db');

class ClientEatingPattern {

    constructor(breakfast, breakfast_detail, lunch, lunch_detail, snacks, snacks_detail, dinner, dinner_detail, client_id) {
        this.breakfast = breakfast;
        this.breakfast_detail = breakfast_detail;
        this.lunch = lunch;
        this.lunch_detail = lunch_detail;
        this.snacks = snacks;
        this.snacks_detail = snacks_detail;
        this.dinner = dinner;
        this.dinner_detail = dinner_detail;
        this.client_id = client_id;
    }

    get data() {
        return Object.values(this);
    }

    insertEatingPattern() {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO np_avg_eating_pattern (breakfast, breakfast_detail, lunch, lunch_detail, snacks, snacks_detail, dinner, dinner_detail, client_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
            db.query(query, this.data, (err, result) => {
                if (err) {
                    reject({ error: true, message: "An error occured while inserting client data" });
                    return;
                }
                resolve("Client data inserted successfully")
            })
        })
    }

    static getClientsPattern(client_id) {
        return new Promise((resolve, reject) => {
            const query = `SELECT np_client_table.npct_id, np_avg_eating_pattern.breakfast, np_avg_eating_pattern.breakfast_detail, np_avg_eating_pattern.lunch,
            np_avg_eating_pattern.lunch_detail, np_avg_eating_pattern.snacks, np_avg_eating_pattern.snacks_detail, np_avg_eating_pattern.dinner,
            np_avg_eating_pattern.dinner_detail FROM np_client_table INNER JOIN np_avg_eating_pattern ON np_client_table.npct_id = client_id AND client_id = ?;`;
            db.query(query, [client_id], (err, result) => {
                if (err) {
                    reject({ error: true, message: "An error occured while inserting client's eating pattern" });
                    return;
                }
                if (result.length) {
                    resolve(result);
                } else {
                    reject({ error: true, message: "Eating pattern for client not available" });
                    return;
                }
            })
        })
    }

}

module.exports = ClientEatingPattern