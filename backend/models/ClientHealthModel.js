const { db } = require('../config/db');

class ClientHealth {
    constructor(enrollment_purpose, diet, occupation, travel_often, out_side_meals, peak_hunger_time, acidity, gas, constipation, hair_fall, acne, weakness, insomnia, any_other, client_id) {
        this.enrollment_purpose = enrollment_purpose;
        this.diet = diet;
        this.occupation = occupation;
        this.travel_often = travel_often;
        this.out_side_meals = out_side_meals;
        this.peak_hunger_time = peak_hunger_time;
        this.acidity = acidity;
        this.gas = gas;
        this.constipation = constipation;
        this.hair_fall = hair_fall;
        this.acne = acne;
        this.weakness = weakness;
        this.insomnia = insomnia;
        this.any_other = any_other;
        this.client_id = client_id;
    }

    get clientHealthData() {
        return Object.values(this)
    }

    static getClientsHealthDetail() {
        return new Promise((resolve, reject) => {
            const query = "SELECT npcht_id, enrollment_purpose, diet, occupation, travel_often, out_side_meals, peak_hunger_time, acidity, gas, constipation, hair_fall, acne,weakness ,insomnia, any_other, client_id FROM np_client_health_table WHERE int_delete_flag = 0;";
            db.query(query, (err, result) => {
                if (err) {
                    reject({ error: true, message: "An error occured while retreiving clients health details" })
                    return;
                }
                resolve(result);
            })
        })
    }

    static getHealthDataByClientId(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT npcht_id, enrollment_purpose, diet, occupation, travel_often, out_side_meals, peak_hunger_time, acidity, gas, constipation, hair_fall, acne,weakness ,insomnia, any_other, client_id FROM np_client_health_table WHERE int_delete_flag = 0 AND client_id = ?;";
            db.query(query, [id], (err, result) => {
                if (err) {
                    reject({ error: true, message: "An error occured while retreiving client's health details" })
                    return;
                }
                if (result.length) {
                    resolve(result[0]);
                } else {
                    reject({ error: true, message: "Could not find table record with that id" });
                }
            })
        })
    }

    addClientHealthData() {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO np_client_health_table (enrollment_purpose, diet, occupation, travel_often, out_side_meals, peak_hunger_time, acidity, gas, constipation, hair_fall, acne,weakness ,insomnia, any_other, client_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
            db.query(query, this.clientHealthData, (err, result) => {
                if (err) {
                    reject({ error: true, message: "An error occured while inserting client's health details" })
                    return;
                }
                resolve({ success: true, message: "Client's health detail inserted successfully" })
            })
        })
    }

    static showDataTableById(client_id) {
        return new Promise((resolve, reject) => {
            const query = `SELECT np_client_table.name, np_client_health_table.enrollment_purpose, np_client_health_table.diet, np_client_health_table.occupation,
            np_client_health_table.travel_often, np_client_health_table.out_side_meals, np_client_health_table.peak_hunger_time, np_client_health_table.acidity,
            np_client_health_table.gas, np_client_health_table.constipation, np_client_health_table.hair_fall, np_client_health_table.acne, np_client_health_table.weakness,
            np_client_health_table.insomnia, np_client_health_table.any_other FROM np_client_table INNER JOIN np_client_health_table ON np_client_table.npct_id = np_client_health_table.client_id AND np_client_table.npct_id = ?;`;
            db.query(query, [client_id], (err, result) => {
                if (err) {
                    reject({ error: true, message: "An error occured while creating table for client's health data" });
                    return;
                }
                if (result.length) {
                    resolve(result);
                } else {
                    reject({ error: true, message: "No health data available for client" });
                }
            })
        })
    }

    static showDataTable() {
        return new Promise((resolve, reject) => {
            const query = `SELECT np_client_table.name, np_client_health_table.enrollment_purpose, np_client_health_table.diet, np_client_health_table.occupation,
            np_client_health_table.travel_often, np_client_health_table.out_side_meals, np_client_health_table.peak_hunger_time, np_client_health_table.acidity,
            np_client_health_table.gas, np_client_health_table.constipation, np_client_health_table.hair_fall, np_client_health_table.acne, np_client_health_table.weakness,
            np_client_health_table.insomnia, np_client_health_table.any_other FROM np_client_table INNER JOIN np_client_health_table ON np_client_table.npct_id = np_client_health_table.client_id;`;
            db.query(query, (err, result) => {
                if (err) {
                    reject({ error: true, message: "An error occured while creating table for client's health data" });
                    return;
                }
                resolve(result);
            })
        })
    }

    static deletClientHealthData(client_id) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE np_client_health_table SET int_delete_flag = 1 WHERE client_id = ?;"
            db.query(query, [client_id], (err, result) => {
                if (err) {
                    reject({ error: true, message: "An error occured while deleting client health table" });
                    return;
                }
                resolve("Client's health data successfully deleted")
            })
        })
    }

    static updateClientHealthData(id, healthData) {
        return new Promise(async (resolve, reject) => {
            const data = [];
            const clientHealthData = await this.getClientData(id);
            if (!clientHealthData.npcht_id) {
                reject({ error: true, message: "Table column with that id not found" })
                return;
            }
            const enrollment_purpose = healthData.enrollment_purpose || clientHealthData.enrollment_purpose;
            data.push(enrollment_purpose);
            const diet = healthData.diet || clientHealthData.diet;
            data.push(diet);
            const occupation = healthData.occupation || clientHealthData.occupation;
            data.push(occupation);
            const travel_often = healthData.travel_often || clientHealthData.travel_often;
            data.push(travel_often);
            const out_side_meals = healthData.out_side_meals || clientHealthData.peak_hunger_time;
            data.push(out_side_meals);
            const peak_hunger_time = healthData.peak_hunger_time || clientHealthData.peak_hunger_time;
            data.push(peak_hunger_time);
            const acidity = healthData.acidity || clientHealthData.acidity;
            data.push(acidity);
            const gas = healthData.gas || clientHealthData.gas;
            data.push(gas);
            const constipation = healthData.constipation || clientHealthData.constipation;
            data.push(constipation);
            const hair_fall = healthData.hair_fall || clientHealthData.hair_fall;
            data.push(hair_fall);
            const acne = healthData.acne || clientHealthData.acne;
            data.push(acne);
            const weakness = healthData.weakness || clientHealthData.weakness;
            data.push(weakness);
            const insomnia = healthData.insomnia || clientHealthData.insomnia;
            data.push(insomnia);
            const any_other = healthData.any_other || clientHealthData.any_other;
            data.push(any_other);
            const query = "UPDATE np_client_health_table SET enrollment_purpose = ?, diet = ?, occupation =? , travel_often = ?, out_side_meals = ?, peak_hunger_time = ?, acidity = ?, gas = ?, constipation = ?, hair_fall = ?, acne = ?, weakness = ?, insomnia = ?, any_other = ? WHERE int_delete_flag = 0 AND npcht_id = ?;";
            db.query(query, data, (err, result) => {
                if (err) {
                    reject({ error: true, message: "An error occured while updating client's data" });
                    return;
                }
                resolve(result);
            })
        })
    }
}

module.exports = ClientHealth