const express = require("express");
const { signup, signin } = require("../controllers/auth");

const { check } = require("express-validator");

const router = express.Router();

// SIGNUP
router.post(
  "/signup",
  [
    check("name").isLength({ min: 3 }).withMessage("Please enter the name"),
    check("userName")
      .isLength({ min: 1 })
      .withMessage("please enter the username"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Please enter the password min 6 character"),
  ],
  signup
);

// SIGNIN
router.post(
  "/signin",
  [
    check("userName")
      .isLength({ min: 1 })
      .withMessage("please enter the username"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Please enter the password"),
  ],
  signin
);

module.exports = router;
