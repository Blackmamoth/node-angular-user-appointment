const asyncHandler = require("express-async-handler");
const Appointment = require("../models/appointmentModel");

const getAppointments_xhr = asyncHandler(async (req, res) => {
  const appointments = await Appointment.getAppointments();
  res.json(appointments);
});

const getAppointment_xhr = asyncHandler(async (req, res) => {
  const appointment = await Appointment.getAppointment(req.params.id);
  try {
    res.status(200).json({ success: true, message: appointment });
  } catch (error) {
    res.status(400).json({ error: true, message: error });
    throw new Error(error);
  }
});

const setAppointment_xhr = asyncHandler(async (req, res) => {
  const {
    country_code,
    mobile_num,
    alternate_mobile_num,
    name,
    email,
    client_type,
    appointment_for,
    package_name,
    date_of_appointment,
  } = req.body;
  if (
    !country_code ||
    !mobile_num ||
    !alternate_mobile_num ||
    !alternate_mobile_num ||
    !name ||
    !email ||
    !client_type ||
    !appointment_for ||
    !package_name ||
    !date_of_appointment
  ) {
    res.status(400).json({ error: true, message: "All fields are required" });
    throw new Error("All fields are required");
  }

  const appointment = new Appointment(
    country_code,
    mobile_num,
    alternate_mobile_num,
    name,
    email,
    client_type,
    appointment_for,
    package_name,
    date_of_appointment
  );
  try {
    const appoint = await appointment.setAppointment();
    res.status(201).json(appoint);
  } catch (error) {
    res.status(400).json({ error: true, message: error });
  }
});

module.exports = {
  getAppointments_xhr,
  getAppointment_xhr,
  setAppointment_xhr,
};
