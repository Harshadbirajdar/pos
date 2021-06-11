const express = require("express");
const router = express.Router();
const { getUserById } = require("../controllers/user");
const {
  isSignIn,
  isAuthinticated,
  isManager,
  checkToken,
} = require("../controllers/auth");
const { addSalesman, testReport } = require("../controllers/salesman");
const { check } = require("express-validator");
router.param("userId", getUserById);

router.post(
  "/:userId/salesman",
  [
    check("name").isLength({ min: 3 }).withMessage("Please enter the name"),
    check("id")
      .isLength({ min: 1 })
      .withMessage("Please enter the Salesman id"),
  ],
  isSignIn,
  checkToken,
  isAuthinticated,
  isManager,
  addSalesman
);

router.get("/test/report", testReport);

module.exports = router;
