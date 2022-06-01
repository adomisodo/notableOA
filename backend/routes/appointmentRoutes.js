const express = require("express");
const router = express.Router();
const {
  getAppointments,
  deleteAppointment,
  addAppointment,
} = require("../controllers/appointmentController");

router.route("/:id").delete(deleteAppointment);
router.route("/doctor/:doctorId").post(addAppointment);
router.route("/doctor/:doctorId/:date").get(getAppointments);

module.exports = router;
