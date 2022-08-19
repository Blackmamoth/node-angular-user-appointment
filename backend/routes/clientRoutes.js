const router = require('express').Router()
const { addClient_xhr, getClients_xhr, getClientById_xhr, getClientByPhone_xhr } = require('../controllers/clientController')

router.route('/add').post(addClient_xhr)
router.route('/getClients').get(getClients_xhr)
router.route("/getClientByPhone").get(getClientByPhone_xhr)
router.route("/getClients/:id").get(getClientById_xhr)

module.exports = router