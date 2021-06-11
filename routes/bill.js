const express = require("express");
const { createBill } = require("../controllers/bill");
const { pushBillInCustomer } = require("../controllers/customer");
const { getUserById } = require("../controllers/user");
const {
  isCashier,
  isSignIn,
  checkToken,
  isAuthinticated,
} = require("../controllers/auth");
const router = express.Router();

router.param("userId", getUserById);

router.post(
  "/:userId/bill",
  isSignIn,
  checkToken,
  isAuthinticated,
  isCashier,
  createBill,
  pushBillInCustomer
);

module.exports = router;
