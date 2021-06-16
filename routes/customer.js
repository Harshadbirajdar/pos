const express = require("express");
const {
  isSignIn,
  checkToken,
  isAuthinticated,
  isCashier,
  isManager,
  isSaleSupervisor,
} = require("../controllers/auth");
const {
  getCustomerByPhone,
  createCustomer,
  getAllCustomer,
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

router.get(
  "/:userId/all/customer",
  isSignIn,
  checkToken,
  isAuthinticated,
  isSaleSupervisor,
  getAllCustomer
);

module.exports = router;
