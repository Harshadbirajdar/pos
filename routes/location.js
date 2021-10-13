const express = require("express");
const { check } = require("express-validator");
const {
  isSignIn,
  checkToken,
  isAuthinticated,
  isAdmin,
} = require("../controllers/auth");
const { createNewLocation } = require("../controllers/location");
const { getUserById } = require("../controllers/user");
const router = express.Router();

router.param("userId", getUserById);

router.post(
  "/:userId/location",
  [
    check("name")
      .isLength({ min: 1 })
      .withMessage("Please enter the location name"),
  ],
  isSignIn,
  checkToken,
  isAuthinticated,
  isAdmin,
  createNewLocation
);

module.exports = router;
