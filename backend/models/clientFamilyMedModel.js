const e = require('express');
const { db } = require('../config/db');

class ClientFamilyMed {
    constructor(mother, father, brother, sister, grandparents, client_id) {
        this.mother = JSON.stringify(mother);
        this.father = JSON.stringify(father);
        this.brother = JSON.stringify(brother);
        this.sister = JSON.stringify(sister);
        this.grandparents = JSON.stringify(grandparents);
        this.client_id = client_id;
    }

    get data() {
        return Object.values(this);
    }

    addMedData() {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO np_client_family_med_history (mother, father, brother, sister, grandparent, client_id) VALUES (?, ?, ?, ?, ?, ?);";
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
            const query = `SELECT np_client_table.name, np_client_family_med_history.mother, np_client_family_med_history.father, np_client_family_med_history.brother,
            np_client_family_med_history.sister, np_client_family_med_history.grandparent FROM np_client_table INNER JOIN np_client_family_med_history WHERE npct_id = client_id AND client_id = ?;`;
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