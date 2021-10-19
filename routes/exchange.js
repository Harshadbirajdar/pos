const express = require("express");
const router = express.Router();
const { isSignIn, isAuthinticated, isCashier } = require("../controllers/auth");
const {
  createExchangeBill,
  getExchaneBillByNumber,
  getBillByBarocde,
} = require("../controllers/exchange");
const { getUserById } = require("../controllers/user");
router.param("userId", getUserById);

router.post(
  "/:userId/exchange",
  isSignIn,
  isAuthinticated,
  isCashier,
  createExchangeBill
);
router.get(
  "/:userId/exchange",
  isSignIn,
  isAuthinticated,
  isCashier,
  getExchaneBillByNumber
);

router.get(
  "/:userId/exchange/bill/barcode",
  isSignIn,
  isAuthinticated,
  isCashier,
  getBillByBarocde
);
module.exports = router;
