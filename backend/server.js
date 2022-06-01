require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

connectDB(process.env.MONGO_URI);
const app = express();
app.use(express.json());

//routers
const doctorRouter = require("./routes/doctorRoutes");
const appointmentRouter = require("./routes/appointmentRoutes");

// error handler
const {
  notFound,
  errorHandler,
} = require("./middleware/errorHandlerMiddleware");

// routes
// app.get("/api/v1", (req, res) => {
//   console.log("hello world");
//   res.send();
// });
app.use("/api/v1/doctors", doctorRouter);
app.use("/api/v1/appointments", appointmentRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
