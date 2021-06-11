const express = require("express");
const {
  isSignIn,
  checkToken,
  isAuthinticated,
  isManager,
  isCashier,
} = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const {
  purchaseEntry,
  getProductByBarcode,
} = require("../controllers/product");

const router = express.Router();
router.param("userId", getUserById);

router.post(
  "/:userId/product",
  isSignIn,
  checkToken,
  isAuthinticated,
  isManager,
  purchaseEntry
);
router.get(
  "/:userId/product",
  isSignIn,
  checkToken,
  isAuthinticated,
  isCashier,
  getProductByBarcode
);

module.exports = router;