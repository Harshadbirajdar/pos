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
