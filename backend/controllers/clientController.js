const Client = require('../models/clientModel');
const ClientHealth = require('../models/ClientHealthModel');
const ClientVitamin = require('../models/ClientVitaminsModel');
const ClientFamilyMed = require('../models/clientFamilyMedModel');
const ClientEatingPattern = require('../models/ClientAvgEatingPattern');
const asyncHandler = require("express-async-handler");


const addClient_xhr = asyncHandler(async (req, res) => {
    const { name, gender, email, dob, mobile_num, country_name, state_name, city_name, address_home, address_office, telephone_home, telephone_office, martial_status, about_client } = req.body;
    if (!name || !gender || !email || !dob, !mobile_num, !country_name, !state_name, !city_name, !address_home, !martial_status, !about_client) {
        res.status(400).json({ incomplete: true, message: "Please provide all the mandatory details" })
        return;
    }
    const client = new Client(name, gender, email, dob, mobile_num, country_name, state_name, city_name, address_home, address_office, martial_status, telephone_home, telephone_office, about_client);
    try {
        const add = await client.addClient()
        res.status(201).json(add);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

const updateClientData_xhr = asyncHandler(async (req, res) => {
    try {
        const updateClient = await Client.updateClientData(req.params.id, req.body);
        res.status(204).json(updateClient);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

const getClients_xhr = asyncHandler(async (req, res) => {
    try {
        const clients = await Client.getClients();
        res.status(200).json({ success: true, data: clients });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})


const getClientById_xhr = asyncHandler(async (req, res) => {
    try {
        const client = await Client.getClientById(req.params.id);
        res.status(200).json({ success: true, data: client });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

const getClientByPhone_xhr = asyncHandler(async (req, res) => {
    try {
        const client = await Client.getClientByPhone(req.query.phone);
        res.status(200).json({ success: true, data: client })
    } catch (err) {
        res.status(400);
        throw new Error(error.message);
    }
})

const addClientHealthData_xhr = asyncHandler(async (req, res) => {
    const { enrollment_purpose, diet, occupation, travel_often, out_side_meals, peak_hunger_time, acidity, gas, constipation, hair_fall, acne, weakness, insomnia, any_other, client_id } = req.body;
    if (!enrollment_purpose || !diet || !occupation || !travel_often || !out_side_meals || !peak_hunger_time || !acidity || !gas || !constipation || !hair_fall || !acne || !weakness || !insomnia || !client_id) {
        res.status(400).json({ error: true, message: "Please fill out all fields" });
        console.log("exiting")
        return;
    }
    const healthData = new ClientHealth(enrollment_purpose, diet, occupation, travel_often, out_side_meals, peak_hunger_time, acidity, gas, constipation, hair_fall, acne, weakness, insomnia, any_other, client_id);
    try {
        const addData = await healthData.addClientHealthData();
        res.status(201).json(addData);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

const getClientsHealthData = asyncHandler(async (req, res) => {
    try {
        const healthData = await ClientHealth.getClientsHealthDetail();
        res.status(200).json({ success: true, data: healthData })
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

const getHealthDataByClientId_xhr = asyncHandler(async (req, res) => {
    try {
        const healthData = await ClientHealth.getHealthDataByClientId(req.params.client_id);
        res.status(200).json({ success: true, data: healthData })
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

const getClientHealthTableById_xhr = asyncHandler(async (req, res) => {
    try {
        const healthTable = await ClientHealth.showDataTableById(req.params.client_id);
        res.status(200).json({ success: true, healthTable })
    } catch (error) {
        res.status(400);
        throw new Error(error.message)
    }
})

const getClientHealthTable_xhr = asyncHandler(async (req, res) => {
    try {
        const healthTable = await ClientHealth.showDataTable();
        res.status(200).json({ success: true, healthTable })
    } catch (error) {
        res.status(400);
        throw new Error(error.message)
    }
})

const updateClientHealthData_xhr = asyncHandler(async (req, res) => {
    try {
        const updateData = await ClientHealth.updateClientHealthData(req.params.client_id, req.body);
        res.status(204).json({ success: true, message: updateData });
    } catch (error) {
        res.status(400);
        throw new Error(error.message)
    }
})

const deleteClientHealthData_xhr = asyncHandler(async (req, res) => {
    try {
        const deleteHealthData = await ClientHealth.deletClientHealthData(req.params.client_id);
        res.status(204).json({ success: true, message: deleteHealthData })
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

const insertClientVitamins_xhr = asyncHandler(async (req, res) => {
    const { vitamin_name, vitamin_dosage, vitamin_timing } = req.body;
    if (!vitamin_name || !vitamin_dosage || !vitamin_timing) {
        res.status(400).json({ error: true, message: "Please provide all fields" });
        return;
    }
    const clientVitamins = new ClientVitamin(vitamin_name, vitamin_dosage, vitamin_timing, req.params.client_id);
    try {
        const addData = await clientVitamins.addClientVitamins();
        res.status(201).json({ success: true, message: addData })
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

const getClientVitaminsTable_xhr = asyncHandler(async (req, res) => {
    try {
        const vitaminTable = await ClientVitamin.showDataTableForClient(req.params.client_id);
        res.status(200).json({ success: true, data: vitaminTable })
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

const deleteClientVitamins_xhr = asyncHandler(async (req, res) => {
    try {
        const deleteVitamins = await ClientVitamin.deleteClientVitamins(req.params.client_id);
        res.status(204).json({ success: true, message: deleteVitamins })
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

const addClientFamilyMed_xhr = asyncHandler(async (req, res) => {
    const { mother, father, brother, sister, grandparents } = req.body;
    if (!mother || !father || !brother || !sister || !grandparents) {
        res.status(400).json({ message: "Please provide all fields" })
        return;
    }
    const familyMed = new ClientFamilyMed(mother, father, brother, sister, grandparents, req.params.client_id);
    try {
        const addMedData = await familyMed.addMedData();
        res.status(201).json({ success: true, data: addMedData });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

const getClientFamilyMedData_xhr = asyncHandler(async (req, res) => {
    try {
        const familyMedData = await ClientFamilyMed.getClientFamilyMedData(req.params.client_id);
        res.status(200).json({ success: true, data: familyMedData });
    } catch (error) {
        res.status(400)
        throw new Error(error.message);
    }
})

const insertClientPattern_xhr = asyncHandler(async (req, res) => {
    const { breakfast, breakfast_detail, lunch, lunch_detail, snacks, snacks_detail, dinner, dinner_detail } = req.body;
    if (!breakfast || !breakfast_detail || !lunch || !lunch_detail || !snacks || !snacks_detail || !dinner || !dinner_detail) {
        res.status(400).json({ message: "Please fill out all the fields" })
        return;
    }
    const eatingPattern = new ClientEatingPattern(breakfast, breakfast_detail, lunch, lunch_detail, snacks, snacks_detail, dinner, dinner_detail, req.params.client_id);
    try {
        const addPattern = await eatingPattern.insertEatingPattern();
        res.status(201).json({ success: true, message: addPattern })
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

const getClientsEatingPattern = asyncHandler(async (req, res) => {
    try {
        const eatingPattern = await ClientEatingPattern.getClientsPattern(req.params.client_id);
        res.status(200).json({ success: true, data: eatingPattern });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

module.exports = {
    addClient_xhr,
    updateClientData_xhr,
    getClients_xhr,
    getClientById_xhr,
    getClientByPhone_xhr,
    addClientHealthData_xhr,
    getHealthDataByClientId_xhr,
    getClientsHealthData,
    updateClientHealthData_xhr,
    insertClientVitamins_xhr,
    getClientHealthTableById_xhr,
    getClientHealthTable_xhr,
    getClientVitaminsTable_xhr,
    deleteClientHealthData_xhr,
    deleteClientVitamins_xhr,
    addClientFamilyMed_xhr,
    getClientFamilyMedData_xhr,
    insertClientPattern_xhr,
    getClientsEatingPattern,
};