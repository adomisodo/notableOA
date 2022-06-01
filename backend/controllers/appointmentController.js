const Appointment = require("../models/appointmentModel");
const asyncHandler = require("express-async-handler");

const getAppointments = asyncHandler(async (req, res) => {
  const { doctorId, date } = req.params;
  // console.log(date);
  const currDay = new Date(date);
  const nextDay = new Date(new Date(currDay).setDate(currDay.getDate() + 1));
  // console.log(currDay, nextDay);
  const appointments = await Appointment.find({
    doctorId: doctorId,
    date: { $gte: currDay, $lt: nextDay },
  });
  res.status(200).json(appointments);
});

const deleteAppointment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id);
  await appointment.remove();
  res.status(200).json({ message: "deleted" });
});

const addAppointment = asyncHandler(async (req, res) => {
  const { doctorId } = req.params;
  const { firstName, lastName, kind, date } = req.body;
  const miniList = [0, 15, 45, 30];
  // console.log(typeof new Date(date).getMinutes());
  if (miniList.includes(new Date(date).getMinutes())) {
    const numOfAppointments = await Appointment.find({
      doctorId: doctorId,
      date: date,
    }).count();
    if (numOfAppointments == 3) {
      res.status(500);
      throw new Error("Time Slot Taken");
    } else {
      const newAppointment = new Appointment({
        patientFirstName: firstName,
        patientLastName: lastName,
        kind: kind,
        date: date,
        doctorId: doctorId,
      });
      const appointment = await newAppointment.save();
      res.status(201).json(appointment);
    }
  } else {
    res.status(500);
    throw new Error("Illegal time slot");
  }
});

module.exports = { getAppointments, deleteAppointment, addAppointment };
