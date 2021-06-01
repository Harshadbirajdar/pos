const express = require("express");
const {
  isSignIn,
  checkToken,
  isAuthinticated,
  isManager,
} = require("../controllers/auth");
const { purchaseEntry } = require("../controllers/product");

const router = express.Router();

router.post(
  "/:userId/product",
  isSignIn,
  checkToken,
  isAuthinticated,
  isManager,
  purchaseEntry
);

module.exports = router;
