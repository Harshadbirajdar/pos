const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const {
  isSignIn,
  checkToken,
  isAuthinticated,
  isCashier,
  isManager,
  isSaleSupervisor,
} = require("../controllers/auth");
const {
  createCategoryBarcode,
  getCategoryByBarcode,
  getCategoryBarcodeName,
} = require("../controllers/categoryBarcode");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);

router.post(
  "/:userId/category/barcode",
  [
    check("name").isLength({ min: 1 }).withMessage("Please enter the name"),
    check("barcode")
      .isLength({ min: 1 })
      .withMessage("Please enter the barcode number"),
    check("hsn").isLength({ min: 1 }).withMessage("Please enter the HSN Code"),
  ],
  isSignIn,
  checkToken,
  isAuthinticated,
  isManager,
  createCategoryBarcode
);
router.get(
  "/:userId/category/barcode",
  isSignIn,
  checkToken,
  isAuthinticated,
  isCashier,
  getCategoryByBarcode
);
router.get(
  "/:userId/category/barcode/name",
  isSignIn,
  checkToken,
  isAuthinticated,
  isCashier,
  getCategoryBarcodeName
);

module.exports = router;
