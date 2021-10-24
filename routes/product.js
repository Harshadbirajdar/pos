const express = require("express");
const {
  isSignIn,
  checkToken,
  isAuthinticated,
  isManager,
  isCashier,
  isSaleSupervisor,
} = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const {
  purchaseEntry,
  getProductByBarcode,
  getAllproduct,
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
  "/:userId/product/",
  isSignIn,
  checkToken,
  isAuthinticated,
  isCashier,
  getProductByBarcode
);
router.get(
  "/:userId/all/product/",
  isSignIn,
  checkToken,
  isAuthinticated,
  isCashier,
  getAllproduct
);

module.exports = router;
