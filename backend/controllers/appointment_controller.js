const asyncHandler = require("express-async-handler");
const Appointment = require("../models/appointmentModel");
const Client = require('../models/clientModel')

const getAppointments_xhr = asyncHandler(async (req, res) => {
  const appointments = await Appointment.getAppointments();
  res.json(appointments);
});

const getAppointment_xhr = asyncHandler(async (req, res) => {
  const appointment = await Appointment.getAppointment(req.params.id);
  try {
    res.status(200).json({ success: true, message: appointment });
  } catch (error) {
    res.status(400).json({ err: true, message: error });
    throw new Error(error);
  }
});

const setAppointment_xhr = asyncHandler(async (req, res) => {
  const {
    client_type,
    appointment_for,
    package_name,
    date_of_appointment,
    client_id
  } = req.body;

  if (
    !client_type ||
    !appointment_for ||
    !package_name ||
    !date_of_appointment ||
    !client_id
  ) {
    res.status(400).json({ error: true, message: "All fields are required" });
    throw new Error("All fields are required");
  }


  const appointment = new Appointment(client_type, appointment_for, package_name, date_of_appointment, client_id);
  try {
    const appoint = await appointment.setAppointment();
    res.status(201).json({ success: true, message: appoint });
  } catch (error) {
    res.status(400).json({ error: true, message: error });
  }
});

const updateAppointment_xhr = asyncHandler(async (req, res) => {
  const appointment_data = req.body;
  try {
    const updatedAppointment = await Appointment.updateAppointment(
      req.params.id,
      appointment_data
    );
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(400);
    throw new Error(error)
  }
});

const registrationCount_xhr = asyncHandler(async (req, res) => {
  const count = await Appointment.registrationCounts();
  res.json(count);
});

const getAppointmentsBetweenDates_xhr = asyncHandler(async (req, res) => {
  const { date1, date2 } = req.body;
  if (!date1 || !date2) {
    return res.status(400).json({
      error: true,
      message: "Please provide 2 dates to get appointments between those dates",
    });
  }
  const appointments = await Appointment.getAppointmentsBetweenDates(
    date1,
    date2
  );
  res.status(200).json(appointments);
});

const deleteAppointment_xhr = asyncHandler(async (req, res) => {
  const id = req.params.id;
  let appointmentToDelete;
  try {
    appointmentToDelete = await Appointment.deleteAppointment(id);
    res.status(200).json(appointmentToDelete);
  } catch (error) {
    res.status(400).json(error);
  }
});


const getUser = asyncHandler(async (req, res) => {
  const mobile_num = req.body.mobile_num;
  if (!mobile_num) {
    return res.status(400).json({
      error: true,
      message: "Please provide a mobile number to search user by",
    });
  }
  const user = await Client.getClientByPhone(mobile_num);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  return res.status(200).json({ success: true, user });
});

const getHolidays_xhr = asyncHandler(async (req, res) => {
  const holidays = await Appointment.getHolidays();
  if (holidays) {
    res.status(200).json(holidays);
  } else {
    res.status(400).json({ error: true, message: "Something went wrong" });
  }
});

const addClientToAppointment = asyncHandler(async (req, res) => {
  const { client_id, appointmentID } = req.body;
  console.log(req.body)
  if (!client_id) {
    res.status(400);
    throw new Error("User specified is not a registered user")
  }
  try {
    const addClient = await Appointment.addClient(client_id, appointmentID);
    res.status(200).json({ success: true, message: addClient })
  } catch (err) {
    res.status(400);
    throw new Error(err);
  }
})

module.exports = {
  getAppointments_xhr,
  getAppointment_xhr,
  setAppointment_xhr,
  registrationCount_xhr,
  getAppointmentsBetweenDates_xhr,
  updateAppointment_xhr,
  deleteAppointment_xhr,
  getUser,
  getHolidays_xhr,
  addClientToAppointment
};
