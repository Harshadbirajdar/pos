const Exchange = require("../model/exchangeBill");
const Salesman = require("../model/salesman");
const Product = require("../model/product");
const Bill = require("../model/bill");

exports.createExchangeBill = async (req, res, next) => {
  let exchangeBill = new Exchange(req.body);

  let salesman = [];
  let stockUpdate = [];
  let product = req.body.product;
  product.map((product) => {
    let a = {
      updateOne: {
        filter: { id: product.salesman },
        update: { $inc: { commision: -product.commission } },
      },
    };
    let stock = {
      updateOne: {
        filter: { _id: product._id },
        update: { $inc: { qty: product.qty } },
      },
    };

    salesman.push(a);
    stockUpdate.push(stock);
  });
  Salesman.bulkWrite(salesman);
  Product.bulkWrite(stockUpdate);

  exchangeBill.save((err, exchangeBill) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "Something went wrong",
      });
    }
    req.exchangeBill = exchangeBill;
    res.json(exchangeBill);
    // next();
  });
};

exports.getExchaneBillByNumber = (req, res) => {
  const { billNo, date } = req.query;

  const currentDate = new Date(date).setHours(00, 00, 00);

  Exchange.findOne({
    billNo,
    // createdAt: {
    //   $gte: currentDate,
    //   $lte: new Date(currentDate).setHours(23, 59, 59),
    // },
  }).exec((err, bill) => {
    if (err) {
      return res.status(400).json({
        error: "Something went wrong...",
      });
    }
    if (!bill) {
      return res.status(403).json({
        error: "Bill Not Found...",
      });
    }
    return res.json(bill);
  });
};

exports.getBillByBarocde = (req, res) => {
  const { barcode } = req.query;
  Bill.findOne({
    product: {
      $elemMatch: { barcode, isReturn: false },
    },
  })
    .populate("customer")
    .exec((err, bill) => {
      if (err) {
        return res.status(400).json({
          error: "Something went wrong...",
        });
      }
      if (!bill) {
        return res.status(403).json({
          error: "No Bill was found",
        });
      }
      return res.json(bill);
    });
};
