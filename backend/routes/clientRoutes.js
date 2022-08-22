const router = require('express').Router()
const { addClient_xhr, updateClientData_xhr, getClients_xhr, getClientById_xhr, getClientByPhone_xhr,
    addClientHealthData_xhr, getHealthDataByClientId_xhr, getClientsHealthData, updateClientHealthData_xhr,
    insertClientVitamins_xhr, getClientHealthTableById_xhr, getClientHealthTable_xhr, getClientVitaminsTable_xhr,
    deleteClientHealthData_xhr, deleteClientVitamins_xhr, addClientFamilyMed_xhr, getClientFamilyMedData_xhr
    , insertClientPattern_xhr, getClientsEatingPattern } = require('../controllers/clientController')

router.route('/').get(getClients_xhr)
router.route('/add').post(addClient_xhr)
router.route("/byPhone").get(getClientByPhone_xhr)
router.route("/clientHealth").post(addClientHealthData_xhr).get(getClientsHealthData)
router.route("/clientHealth/table").get(getClientHealthTable_xhr)
router.route("/clientHealth/table/:client_id").get(getClientHealthTableById_xhr)
router.route("/clientHealth/:client_id").get(getHealthDataByClientId_xhr).patch(updateClientHealthData_xhr).delete(deleteClientHealthData_xhr)
router.route("/clientVitamins/:client_id").post(insertClientVitamins_xhr).delete(deleteClientVitamins_xhr)
router.route("/clientVitamins/table/:client_id").get(getClientVitaminsTable_xhr)
router.route("/familyMedicalHistory/:client_id").post(addClientFamilyMed_xhr).get(getClientFamilyMedData_xhr)
router.route("/avgEatingPattern/:client_id").post(insertClientPattern_xhr).get(getClientsEatingPattern);
router.route("/:id").get(getClientById_xhr)
router.route("/:id/update").patch(updateClientData_xhr)

module.exports = router 