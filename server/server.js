"use strict";

const express = require("express");
const morgan = require("morgan");

const { 
  getMonths, 
  getMonth,
  getReservations,
  getReservation,
  addReservation,
  updateReservation,
  deleteReservation,
} = require("./handler");

const PORT = 8080;

express()
  .use(morgan("tiny"))
  .use(express.json())

// RESTful endpoints
// -----------------------------------
.get("/api/get-months", getMonths)
.get("/api/get-month/:spot", getMonth)
.get("/api/get-reservations", getReservations)
.get("/api/get-reservation/:reservation", getReservation)
.post("/api/addReservation", addReservation)
.patch("/api/updateReservation", updateReservation)
.delete("/api/deleteReservation/:reservation", deleteReservation)
// -----------------------------------

.listen(PORT, () => console.info(`Listening on port ${PORT}... We're Going live!`));
