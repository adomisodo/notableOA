const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientFirstName: {
    type: String,
    required: true,
  },
  patientLastName: {
    type: String,
    required: true,
  },
  kind: {
    type: String,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctors",
  },
  date: {
    type: Date,
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
