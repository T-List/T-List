/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();

// IMPORT CONTROLLERS
const apiController = require("./apiController");

router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if ((username === "admin") & (password === "pass")) {
    res.status(200).json("Login Success");
  } else {
    res.status(400).json("Login Failure");
  }
});

// GET ALL PINS / LOCATIONS
router.get("/", apiController.getAllPins, (req, res) => {
  res.status(200).json(res.locals.allPins);
});

// GET REQUEST FOR REVIEWS FOR ONE PIN/LOCATION
router.get("/:id", apiController.getReviews, (req, res) => {
  res.status(200).json(res.locals.reviews);
  // res.sendStatus(200);
});

// POST REQUEST FOR REVIEWS TO A PIN/LOCATION
router.post(
  "/postReview",
  apiController.createNewPin,
  apiController.getPin,
  apiController.addReview,
  (req, res) => {
    res.sendStatus(200);
  }
);

// EXPORT APIROUTER
module.exports = router;
