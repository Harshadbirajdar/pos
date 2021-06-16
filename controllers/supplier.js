const Supplier = require("../model/supplier");
const { validationResult } = require("express-validator");

// add new party memebrt

exports.createSupplier = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }

  const supplier = new Supplier({ ...req.body, createdBy: req.profile.name });

  supplier.save((err, supplier) => {
    if (err) {
      if (err.keyPattern.name === 1) {
        return res.status(400).json({
          error: `${err.keyValue.name} is already present`,
        });
      }
      if (err.keyPattern.shortName === 1) {
        return res.status(400).json({
          error: `Supplier Short Name ${err.keyValue.shortName} is already present`,
        });
      }
      return res.status(400).json({
        error: "Something Went Wrong",
      });
    }

    res.json(supplier);
  });
};

// get all supliers

exports.getAllSupplier = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 0;

  const startIndex = limit * page;

  const totalCount = await Supplier.find().countDocuments();

  Supplier.find()
    .limit(limit)
    .skip(startIndex)

    .exec((err, supplier) => {
      if (err) {
        return res.status(400).json({
          error: "Something Went wrong",
        });
      }

      return res.json({
        supplier,
        totalCount,
      });
    });
};

// get supplier by name

exports.getSupplierByName = (req, res) => {
  const name = req.query.name;

  Supplier.find({ name: { $regex: new RegExp(name, "i") } })
    .select("name shortName")
    .exec((err, supplier) => {
      if (err) {
        return res.status(400).json({
          error: "Something Went wrong",
        });
      }
      return res.json(supplier);
    });
};
