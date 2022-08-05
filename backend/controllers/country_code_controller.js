const asyncHandler = require("express-async-handler");
const { db } = require("../config/db");

const getCountry_codes_helper = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT dial_code FROM np_country_code_table;";
    db.query(query, (err, result) => {
      if (err) throw new Error(err.message);
      resolve(result);
    });
  });
};

const getCountry_codes_xhr = asyncHandler(async (req, res) => {
  const country_codes = await getCountry_codes_helper();
  res.json(country_codes);
});

module.exports = { getCountry_codes_xhr };
