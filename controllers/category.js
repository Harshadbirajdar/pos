const Category = require("../model/category");
const { validationResult } = require("express-validator");

// create a category
exports.CreateCategory = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }

  let category = new Category(req.body);

  category.save((err, category) => {
    if (err) {
      if (err.keyPattern.name) {
        return res.status(400).json({
          error: `${err.keyValue.name} is already present`,
        });
      }
      return res.status(400).json({
        error: "Something went wrong",
      });
    }

    res.json(category);
  });
};

// get All category
exports.getAllCategory = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 0;

  const startIndex = limit * page;

  const totalCount = await Category.find().countDocuments();

  Category.find()
    .limit(limit)
    .skip(startIndex)
    .exec((err, category) => {
      if (err) {
        return res.status(400).json({
          error: "Something Went wrong",
        });
      }

      return res.json({
        category,
        totalCount,
      });
    });
};

exports.getAllCategoryName = (req, res) => {
  const name = req.query.name;

  Category.find({ name: { $regex: new RegExp(name, "i") } })
    .select("name")
    .exec((err, supplier) => {
      if (err) {
        return res.status(400).json({
          error: "Something Went wrong",
        });
      }
      return res.json(supplier);
    });
};
