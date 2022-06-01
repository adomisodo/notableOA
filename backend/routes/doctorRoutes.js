const express = require("express");
const router = express.Router();
const {
  getAllDoctors,
  addOneDoctor,
} = require("../controllers/doctorController");

router.route("/").get(getAllDoctors).post(addOneDoctor);

module.exports = router;
