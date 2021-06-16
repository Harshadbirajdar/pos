const express = require("express");
const { createBill, getAllBill } = require("../controllers/bill");
const { pushBillInCustomer } = require("../controllers/customer");
const { getUserById } = require("../controllers/user");
const {
  isCashier,
  isSignIn,
  checkToken,
  isAuthinticated,
  isSaleSupervisor,
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

router.get(
  "/:userId/report/bill",
  isSignIn,
  checkToken,
  isAuthinticated,
  isSaleSupervisor,
  getAllBill
);
module.exports = router;
