const express = require("express");
const {
  isSignIn,
  checkToken,
  isAuthinticated,
  isCashier,
} = require("../controllers/auth");
const {
  getCustomerByPhone,
  createCustomer,
} = require("../controllers/customer");
const { getUserById } = require("../controllers/user");
const router = express.Router();

router.param("userId", getUserById);

router.get(
  "/:userId/customer",
  isSignIn,
  checkToken,
  isAuthinticated,
  isCashier,
  getCustomerByPhone
);

router.post(
  "/:userId/customer",
  isSignIn,
  checkToken,
  isAuthinticated,
  isCashier,
  createCustomer
);

module.exports = router;
