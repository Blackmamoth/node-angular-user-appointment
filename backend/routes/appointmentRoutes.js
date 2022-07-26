const router = require("express").Router();
const {
  getAppointments_xhr,
  getAppointment_xhr,
  setAppointment_xhr,
  registrationCount_xhr,
  getAppointmentsBetweenDates_xhr,
  updateAppointment_xhr,
  deleteAppointment_xhr,
  addClientToAppointment_xhr,
} = require("../controllers/appointment_controller");

router.route("/").get(getAppointments_xhr).post(setAppointment_xhr);
router.route("/dates").post(getAppointmentsBetweenDates_xhr);
router.route("/count").get(registrationCount_xhr);
router.route("/addClient").post(addClientToAppointment_xhr);
router
  .route("/:id")
  .get(getAppointment_xhr)
  .patch(updateAppointment_xhr)
  .delete(deleteAppointment_xhr);

module.exports = router;
