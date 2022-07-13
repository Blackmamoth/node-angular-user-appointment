const express = require("express");
const { connectDB } = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/appointments", require("./routes/appointmentRoutes"));

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
