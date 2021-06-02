const express = require("express");
const {
  isSignIn,
  checkToken,
  isAuthinticated,
  isManager,
} = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const { purchaseEntry } = require("../controllers/product");

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

module.exports = router;
