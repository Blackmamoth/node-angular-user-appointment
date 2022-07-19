const router = require("express").Router();
const {
  getAppointments_xhr,
  getAppointment_xhr,
  setAppointment_xhr,
  registrationCount_xhr,
} = require("../controllers/appointment_controller");

router.route("/").get(getAppointments_xhr).post(setAppointment_xhr);
router.route("/count").get(registrationCount_xhr);
router.route("/:id").get(getAppointment_xhr);

module.exports = router;
