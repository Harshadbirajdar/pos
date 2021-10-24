const express = require("express");
const {
  createBill,
  getAllBill,
  getDayBillReportSummery,
  getBillByBarcode,
  getWeeklyChartData,
} = require("../controllers/bill");
const { pushBillInCustomer } = require("../controllers/customer");
const { getUserById } = require("../controllers/user");
const {
  isCashier,
  isSignIn,
  checkToken,
  isAuthinticated,
  isSaleSupervisor,
  isManager,
} = require("../controllers/auth");
const router = express.Router();

router.param("userId", getUserById);

router.post(
  "/:userId/bill",
  isSignIn,
  checkToken,
  isAuthinticated,
  isCashier,
  createBill,
  pushBillInCustomer
);

router.get(
  "/:userId/report/bill",
  isSignIn,
  checkToken,
  isAuthinticated,
  isCashier,
  getAllBill
);
// TODO: come here
router.get("/test/print", getDayBillReportSummery);

router.get(
  "/:userId/bill/barcode",
  isSignIn,
  checkToken,
  isAuthinticated,
  isCashier,
  getBillByBarcode
);

router.get(
  "/:userId/bill/chart",
  isSignIn,
  checkToken,
  isAuthinticated,
  isManager,
  getWeeklyChartData
);
module.exports = router;
