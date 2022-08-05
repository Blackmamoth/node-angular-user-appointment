const {
  getCountry_codes_xhr,
} = require("../controllers/country_code_controller");

const router = require("express").Router();

router.route("/").get(getCountry_codes_xhr);

module.exports = router;
