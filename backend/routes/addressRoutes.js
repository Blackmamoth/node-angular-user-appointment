const router = require('express').Router();
const { getCities_xhr, getCountries_xhr, getStates_xhr } = require('../controllers/addressController.')


router.route('/countries').get(getCountries_xhr);
router.route('/states').get(getStates_xhr)
router.route('/cities').get(getCities_xhr)

module.exports = router