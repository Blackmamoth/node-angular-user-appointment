const express = require("express");
const { connectDB } = require("./config/db");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/address", require('./routes/addressRoutes'))
app.use("/api/countryCodes", require("./routes/countryCodeRoutes"));
app.use("/api/clients", require('./routes/clientRoutes'));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/appointments", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/appointment-form", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/calendar", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/appointments/:id/edit", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/appointments/:id/add-client", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
