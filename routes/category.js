const express = require("express");
const { check } = require("express-validator");
const {
  isSignIn,
  checkToken,
  isAuthinticated,
  isManager,
} = require("../controllers/auth");
const {
  CreateCategory,
  getAllCategory,
  getAllCategoryName,
} = require("../controllers/category");
const router = express.Router();
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);

router.post(
  "/:userId/category",
  [check("name").isLength({ min: 2 }).withMessage("Please enter the name")],
  isSignIn,
  checkToken,
  isAuthinticated,
  isManager,
  CreateCategory
);

router.get(
  "/:userId/category",
  isSignIn,
  checkToken,
  isAuthinticated,
  isManager,
  getAllCategory
);
router.get(
  "/:userId/category/name",
  isSignIn,
  checkToken,
  isAuthinticated,
  isManager,
  getAllCategoryName
);

module.exports = router;
