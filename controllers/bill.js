const Bill = require("../model/bill");
const Salesman = require("../model/salesman");
const Product = require("../model/product");

exports.createBill = async (req, res, next) => {
  let bill = new Bill(req.body);

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

  bill.save((err, bill) => {
    if (err) {
      return res.status(400).json({
        error: "Something went wrong",
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

  console.log(req.query);
  Bill.find({ createdAt: { $gte: startDate, $lte: endDate } })
    .limit(limit)
    .skip(startIndex)
    .sort([["createdAt", sort]])
    .populate("customer")
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
