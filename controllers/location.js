const Location = require("../model/location");
const { validationResult } = require("express-validator");

// Create New Location...
exports.createNewLocation = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }

  const location = new Location({ name: req.body.name });

  location.save((err, location) => {
    if (err) {
      if (err.keyPattern.name === 1) {
        return res.status(400).json({
          error: `${err.keyValue.name} is already present`,
        });
      }
      return res.status(400).json({
        error: "Something went wrong...",
      });
    }

    return res.json(location);
  });
};
