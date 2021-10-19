const { validationResult } = require("express-validator");
const CategoryBarcode = require("../model/categoryBarcode");

exports.createCategoryBarcode = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }
  let categoryBarcode = new CategoryBarcode(req.body);

  categoryBarcode.save((err, category) => {
    if (err) {
      if (err.keyPattern.barcode === 1) {
        return res.status(400).json({
          error: ` barcode number ${err.keyValue.barcode} is already present`,
        });
      }
      if (err.keyPattern.name === 1) {
        return res.status(400).json({
          error: ` category name ${err.keyValue.name} is already present`,
        });
      }
      return res.status(400).json({
        error: err,
      });
    }
    return res.json(category);
  });
};

exports.getCategoryByBarcode = (req, res) => {
  const barcode = req.query.barcode;
  // let barcode = queryBarcode.split("/")[0].toString();

  CategoryBarcode.findOne({ barcode }).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Something went wrong",
      });
    }
    if (!category) {
      return res.status(403).json({
        error: `${barcode} number not found in Database`,
      });
    }
    return res.json(category);
  });
};

exports.getCategoryBarcodeName = (req, res) => {
  CategoryBarcode.find().exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Something went wrong",
      });
    }

    return res.json(category);
  });
};
