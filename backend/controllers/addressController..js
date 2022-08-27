const asyncHandler = require("express-async-handler");
const Address = require('../models/addressModel');

const getCountries_xhr = asyncHandler(async (req, res) => {
    try {
        const countries = await Address.getCountries()
        res.status(200).json(countries)
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

const getStates_xhr = asyncHandler(async (req, res) => {
    const country_name = req.query.country
    try {
        const states = await Address.getStates(country_name)
        res.status(200).json(states)
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

const getCities_xhr = asyncHandler(async (req, res) => {
    try {
        const cities = await Address.getCities(req.query.country, req.query.state)
        res.status(200).json(cities)
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

module.exports = {
    getCountries_xhr,
    getStates_xhr,
    getCities_xhr
}