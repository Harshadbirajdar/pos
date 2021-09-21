const express = require("express");
const router = express.Router();
const { isSignIn, isAuthinticated, isCashier } = require("../controllers/auth");
const { createExchangeBill } = require("../controllers/exchange");
const { getUserById } = require("../controllers/user");
router.param("userId", getUserById);

router.post(
  "/:userId/exchange",
  isSignIn,
  isAuthinticated,
  isCashier,
  createExchangeBill
);

module.exports = router;
