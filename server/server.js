"use strict";

const express = require("express");
const morgan = require("morgan");

const { 
  getAllMonth, 
  getSpecificMonth,
  getAllReservations,
  getSpecificReservations,
  addReservation,
  updateReservation,
  deleteReservation,
} = require("./handler");

const PORT = 8000;

express()
  .use(morgan("tiny"))
  .use(express.json())

// RESTful endpoints
// -----------------------------------
.get("/api/getAllMonth", getAllMonth)
.get("/api/getSpecificMonth/:month", getSpecificMonth)
.get("/api/getAllReservations", getAllReservations)
.get("/api/getSpecificReservation/:reservation", getSpecificReservations)
.post("/api/addReservation", addReservation)
.patch("/api/updateReservation", updateReservation)
.delete("/api/deleteReservation/:reservation", deleteReservation)
// -----------------------------------

.listen(PORT, () => console.info(`Listening on port ${PORT}... We're Going live!`));
