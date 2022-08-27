const e = require('express');
const { db } = require('../config/db');

class ClientFamilyMed {
    constructor(diabetes, hypertension, heart_disease, hypothyroid, cancer, overweight, client_id) {
        this.diabetes = JSON.stringify(diabetes);
        this.hypertension = JSON.stringify(hypertension);
        this.heart_disease = JSON.stringify(heart_disease);
        this.hypothyroid = JSON.stringify(hypothyroid);
        this.cancer = JSON.stringify(cancer);
        this.overweight = JSON.stringify(overweight)
        this.client_id = client_id;
    }

    get data() {
        return Object.values(this);
    }

    addMedData() {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO np_client_family_med_history (diabetes, hypertension, heart_disease, hypothyroid, cancer, overweight,client_id) VALUES (?, ?, ?, ?, ?, ?, ?);";
            db.query(query, this.data, (err, result) => {
                if (err) {
                    reject({ error: true, message: "An error occured while inserting client's family medical history" });
                    return;
                }
                resolve("Client's family medical history inserted successfully")
            })
        })
    }

    static getClientFamilyMedData(client_id) {
        return new Promise((resolve, reject) => {
            const query = `SELECT np_client_table.name, np_client_family_med_history.diabetes, np_client_family_med_history.hypertension, np_client_family_med_history.heart_disease,
            np_client_family_med_history.hypothyroid, np_client_family_med_history.cancer, np_client_family_med_history.overweight FROM np_client_table INNER JOIN np_client_family_med_history WHERE npct_id = client_id AND client_id = ?`;
            db.query(query, [client_id], (err, result) => {
                if (err) {
                    reject({ error: true, message: "An error occured while retreiving client's family medical history" });
                    return;
                }
                if (result.length) {
                    resolve(result);
                } else {
                    reject({ error: true, message: "No family medical history available for client" })
                }
            })
        })
    }
}

module.exports = ClientFamilyMed;