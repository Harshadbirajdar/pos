const Exchange = require("../model/exchangeBill");
const Salesman = require("../model/salesman");
const Product = require("../model/product");

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
