const Doctor = require("../models/doctorModel");
const asyncHandler = require("express-async-handler");

const getAllDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find({});
  res.status(200).json(doctors);
});

const addOneDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.create(req.body);
  res.status(201).json(doctor);
});

module.exports = { getAllDoctors, addOneDoctor };
