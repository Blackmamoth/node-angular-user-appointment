const asyncHandler = require("express-async-handler");
const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");

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

  const userByName = await User.findUserByName(name);
  const userByEmail = await User.findUserByEmail(email);
  const userByPhone = await User.findUserByPhone(mobile_num);

  if (!userByEmail && !userByName && !userByPhone) {
    const newUser = new User(
      name,
      email,
      mobile_num,
      alternate_mobile_num,
      package_name
    );
    await newUser.addUser();
  }

  const user = await User.findUserByEmail(email);

  const appointment = new Appointment(
    country_code,
    mobile_num,
    alternate_mobile_num,
    name,
    email,
    client_type,
    appointment_for,
    package_name,
    date_of_appointment,
    user.nput_id
  );
  try {
    const appoint = await appointment.setAppointment();
    res.status(201).json({ success: true, message: appoint });
  } catch (error) {
    res.status(400).json({ error: true, message: error });
  }
});

const updateAppointment_xhr = asyncHandler(async (req, res) => {
  const appointment_data = req.body;
  const updatedAppointment = await Appointment.updateAppointment(
    req.params.id,
    appointment_data
  );
  res.json(updatedAppointment);
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

const addClientToAppointment_xhr = asyncHandler(async (req, res) => {
  const {
    mobile_num,
    alternate_mobile_num,
    name,
    email,
    package_name,
    appointmentID,
  } = req.body;
  const user = await User.findUserByPhone(mobile_num);
  if (user) {
    const addClient = await Appointment.addClient(user.nput_id, appointmentID);
    if (!addClient) {
      res.json({ success: false, message: addClient });
    } else {
      res.json({ success: true, message: addClient });
    }
    console.log(addClient);
  } else {
    const newUser = new User(
      name,
      email,
      mobile_num,
      alternate_mobile_num,
      package_name
    );
    await newUser.addUser();
    const addClient = await Appointment.addClient(user.nput_id, appointmentID);
    if (!addClient) {
      res.json({ success: false, message: addClient });
    } else {
      res.json({ success: true, message: addClient });
    }
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
  const user = await User.findUserByPhone(mobile_num);
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

module.exports = {
  getAppointments_xhr,
  getAppointment_xhr,
  setAppointment_xhr,
  registrationCount_xhr,
  getAppointmentsBetweenDates_xhr,
  updateAppointment_xhr,
  deleteAppointment_xhr,
  addClientToAppointment_xhr,
  getUser,
  getHolidays_xhr,
};
