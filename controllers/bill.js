const Bill = require("../model/bill");
const Salesman = require("../model/salesman");
const Product = require("../model/product");
const Exchange = require("../model/exchangeBill");

exports.createBill = async (req, res, next) => {
  let bill;
  if (req.body?.customer?._id) {
    bill = new Bill(req.body);
  } else {
    bill = new Bill({ ...req.body, customer: null });
  }

  let salesman = [];
  let stockUpdate = [];
  let product = req.body.product;
  product.map((product) => {
    let a = {
      updateOne: {
        filter: { id: product.salesman },
        update: { $inc: { commision: product.commission } },
      },
    };
    let stock = {
      updateOne: {
        filter: { _id: product._id },
        update: { $inc: { qty: -product.qty } },
      },
    };

    salesman.push(a);
    stockUpdate.push(stock);
  });
  Salesman.bulkWrite(salesman);
  Product.bulkWrite(stockUpdate);
  await Exchange.findByIdAndUpdate(req.body.exchange, { isUsed: true });
  bill.save((err, bill) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    req.bill = bill;
    next();
  });
};

exports.getAllBill = async (req, res) => {
  const startDate = new Date(
    new Date(req.query.startDate).setHours(00, 00, 00)
  );
  const endDate = new Date(new Date(req.query.endDate).setHours(23, 59, 59));
  const sort = req.query.sort || "asc";

  const limit = parseInt(req.query.rowPerPage) || 10;
  const page = parseInt(req.query.page);
  const startIndex = limit * page;

  const totalCount = await Bill.find({
    createdAt: { $gte: startDate, $lte: endDate },
  }).countDocuments();

  Bill.find({ createdAt: { $gte: startDate, $lte: endDate } })
    .limit(limit)
    .skip(startIndex)
    .sort([["createdAt", sort]])
    .populate("customer")
    .populate("exchange")
    .exec((err, bill) => {
      if (err) {
        return res.status(400).json({
          error: "Something went wrong",
        });
      }
      return res.json({
        bill,
        totalCount,
      });
    });
};

exports.getDayBillReportSummery = (req, res) => {
  const startDate = new Date(
    new Date(req.query.startDate).setHours(00, 00, 00)
  );
  const endDate = new Date(new Date(req.query.endDate).setHours(23, 59, 59));
  Bill.find({ createdAt: { $gte: startDate, $lte: endDate } }).exec(
    (err, report) => {
      if (err) {
        return res.status(400).json({
          error: "Something went wrong",
        });
      }
      let toatal = report.reduce((a, c) => {
        return a + c.amount;
      }, 0);
      if (report.length === 0) {
        return res.status(403).json({
          error: "Bills not found",
        });
      }
      let startBillNumber = report[0].billNo;
      let endBillNumber = report[report.length - 1].billNo;
      return res.json({ toatal, startBillNumber, endBillNumber });
    }
  );
};

// get bill by _id
exports.getBillByBarcode = (req, res) => {
  const id = req.query.id;

  Bill.findById(id).exec((err, bill) => {
    if (err) {
      return res.status(400).json({
        error: "Something went wrong",
      });
    }

    if (!bill) {
      return res.status(403).json({
        error: "Bill not found",
      });
    }
    return res.json(bill);
  });
};

exports.getWeeklyChartData = (req, res) => {
  let currentDate = req.query.date ? new Date(req.query.date) : new Date();
  let month = currentDate.getMonth();
  let year = currentDate.getFullYear();
  let date = currentDate.getDate();

  let startWeek = new Date(year, month, date - currentDate.getDay());
  let endWeek = new Date(year, month, date - currentDate.getDay() + 7);
  Bill.find({ createdAt: { $gte: startWeek, $lte: endWeek } })
    .select("amount createdAt")
    .exec((err, bills) => {
      if (err) {
        return res.json(err);
      }
      let days = {
        Sunday: 0,
        Monday: 0,
        Tuesday: 0,
        Wednesday: 0,
        Thursday: 0,
        Friday: 0,
        Saturday: 0,
      };
      let dayString = (number) =>
        new Date(year, month, date - currentDate.getDay() + number);
      bills.map((bill) => {
        if (bill.createdAt >= startWeek && bill.createdAt <= dayString(1)) {
          days.Sunday += parseInt(bill.amount);
          return "";
        }
        if (bill.createdAt >= dayString(1) && bill.createdAt <= dayString(2)) {
          days.Monday += parseInt(bill.amount);
          return "";
        }
        if (bill.createdAt >= dayString(2) && bill.createdAt <= dayString(3)) {
          days.Tuesday += parseInt(bill.amount);
          return "";
        }
        if (bill.createdAt >= dayString(3) && bill.createdAt <= dayString(4)) {
          days.Wednesday += parseInt(bill.amount);
          return "";
        }
        if (bill.createdAt >= dayString(4) && bill.createdAt <= dayString(5)) {
          days.Thursday += parseInt(bill.amount);
          return "";
        }
        if (bill.createdAt >= dayString(5) && bill.createdAt <= dayString(6)) {
          days.Friday += parseInt(bill.amount);
          return "";
        }
        if (bill.createdAt >= dayString(6) && bill.createdAt <= dayString(7)) {
          days.Saturday += parseInt(bill.amount);
          return "";
        }
      });
      return res.json(days);
    });
};

exports.getCategorySaleReport = (req, res) => {
  const startDate = new Date(
    new Date(req.query.startDate).setHours(00, 00, 00)
  );
  const endDate = new Date(new Date(req.query.endDate).setHours(23, 59, 59));
  Bill.find({ createdAt: { $gte: startDate, $lte: endDate } })
    .select("product.name product.qty product.isQtyOne")
    .exec((err, bills) => {
      let data = {};
      bills.map((bill) => {
        bill.product.map((product) => {
          if (err) {
            return res.status(400).json({
              error: "Something went wrong...",
            });
          }
          if (!product.isQtyOne) {
            data[product.name] = data[product.name]
              ? data[product.name] + product.qty
              : product.qty;
          }
        });
      });

      return res.json(data);
    });
};
