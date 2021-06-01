const express = require("express");
const { check } = require("express-validator");
const {
  isSignIn,
  checkToken,
  isManager,
  isAuthinticated,
} = require("../controllers/auth");
const {
  createSupplier,
  getAllSupplier,
  getSupplierByName,
} = require("../controllers/supplier");
const { getUserById } = require("../controllers/user");
const router = express.Router();

router.param("userId", getUserById);

// create new party member
router.post(
  "/:userId/supplier",
  [
    check("name").isLength({ min: 3 }).withMessage("Plesae enter the Name"),
    check("shortName")
      .isLength({ min: 1 })
      .withMessage("Please enter the short name"),
    check("contactNumber")
      .isLength({ min: 10 })
      .withMessage("Please enter the vaild contact number"),
  ],
  isSignIn,
  checkToken,
  isAuthinticated,
  isManager,
  createSupplier
);

// get All suppliers
router.get(
  "/:userId/supplier",
  isSignIn,
  checkToken,
  isAuthinticated,
  isManager,
  getAllSupplier
);
// get  suppliers by name
router.get(
  "/:userId/supplier/name",
  isSignIn,
  checkToken,
  isAuthinticated,
  isManager,
  getSupplierByName
);

module.exports = router;
