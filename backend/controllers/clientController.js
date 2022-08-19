const Client = require('../models/clientModel')
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
        res.status(200).json(add);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

const getClients_xhr = asyncHandler(async (req, res) => {
    try {
        const clients = await Client.getClients();
        res.status(200).json({ success: true, clients });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})


const getClientById_xhr = asyncHandler(async (req, res) => {
    try {
        const client = await Client.getClientById(req.params.id);
        res.status(200).json({ success: true, client });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

const getClientByPhone_xhr = asyncHandler(async (req, res) => {
    try {
        console.log(req.query)
        const client = await Client.getClientByPhone(req.query.phone);
        res.status(200).json({ success: true, client })
    } catch (err) {
        res.status(400);
        throw new Error(error.message);
    }
})

module.exports = {
    addClient_xhr,
    getClients_xhr,
    getClientById_xhr,
    getClientByPhone_xhr,
};