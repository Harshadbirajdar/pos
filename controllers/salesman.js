const { validationResult } = require("express-validator");
const Salesman = require("../model/salesman");
const Bill = require("../model/bill");

exports.addSalesman = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }
  let salesman = new Salesman(req.body);

  salesman.save((err, salesman) => {
    if (err) {
      if (err.keyPattern.id === 1) {
        return res.status(400).json({
          error: `Salesman ID ${err.keyValue.id} is already present`,
        });
      }
      return res.status(400).json({
        error: "Something went wrong",
      });
    }
    return res.json(salesman);
  });
};

exports.testReport = (req, res) => {
  console.log(new Date(req.query.date));
  Bill.find(
    { createdAt: { $gte: new Date(req.query.date) } },
    "product",
    (err, product) => {
      let salesman = [];
      let finalSalesman = [];
      product.map((p) => {
        p.product.map((pr) => {
          let c = {
            salesman: pr.salesman,
            commission: pr.commission,
          };

          salesman.push(c);
        });
      });

      for (let index = 0; index < salesman.length; index++) {
        for (
          let secondIndex = index;
          secondIndex < salesman.length;
          secondIndex++
        ) {
          if (salesman[index].salesman === salesman[secondIndex].salesman) {
            salesman.commission = +salesman.commission;
          }
        }
      }
      return res.json(salesman);
    }
  );
};
