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

exports.getSalesmanCommision = async (req, res) => {
  const startDate = new Date(
    new Date(req.query.startDate).setHours(00, 00, 00)
  );
  const endDate = new Date(new Date(req.query.endDate).setHours(23, 59, 59));

  Bill.find({ createdAt: { $gte: startDate, $lte: endDate } })
  .exec((err, product) => {
    if (err) {
      return res.status(400).json({
        error: "Something Went wrong",
      });
    }

    let commission = {};
    product.map((p) => {
      p.product.map((pr) => {
        let number = pr.salesman;

        commission[number] =
          commission[number] === undefined
            ? pr.commission
            : commission[number] + pr.commission;
      });
    });

    return res.json(commission);
  });
};

exports.viewSalesman = async (req, res) => {
  const limit = parseInt(req.query.rowPerPage) || 10;
  const page = parseInt(req.query.page) || 0;

  const startIndex = page * limit;

  const totalCount = await Salesman.find().countDocuments();

  Salesman.find()
    .limit(limit)
    .skip(startIndex)
    .exec((err, salesman) => {
      if (err) {
        return res.status(400).json({
          error: "Something went wrong",
        });
      }

      return res.json({ totalCount, salesman });
    });
};
