const { db } = require('../config/db');

class ClientVitamins {
    constructor(vitamin_name, vitamin_dosage, timing, client_id) {
        this.vitamin_name = vitamin_name;
        this.vitamin_dosage = vitamin_dosage;
        this.timing = timing;
        this.client_id = client_id;
    }

    get vitaminsData() {
        return Object.values(this);
    }

    addClientVitamins() {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO np_client_vitamins (vitamin_name, vitamin_dosage, vitamin_timing, client_id) VALUES (?, ?, ?, ?);";
            db.query(query, this.vitaminsData, (err, result) => {
                if (err) {
                    reject({ error: true, message: "An error occured while inserting client's vitamin data" });
                    return;
                }
                resolve("Client's vitamin data successfully inserted")
            })
        })
    }

    static showDataTableForClient(client_id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT np_client_table.name, np_client_vitamins.vitamin_name, np_client_vitamins.vitamin_dosage, np_client_vitamins.vitamin_timing FROM np_client_table INNER JOIN np_client_vitamins ON np_client_table.npct_id = client_id AND client_id = ?;";
            db.query(query, [client_id], (err, result) => {
                if (err) {
                    reject({ error: true, message: "An error occured while retreiving client vitamins" });
                    return;
                }
                if (result.length) {
                    resolve(result);
                } else {
                    reject({ message: "No vitamin data for client available" })
                }
            })
        })
    }

    static deleteClientVitamins(client_id) {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM np_client_vitamins SET int_delete_flag = 1 WHERE client_id = ?;";
            db.query(query, [client_id], (err, result) => {
                if (err) {
                    reject({ error: true, message: "An error occured while deleting client vitamins" });
                    return;
                }
                resolve("Client vitamins delete successfully");
            })
        })
    }
}

module.exports = ClientVitamins