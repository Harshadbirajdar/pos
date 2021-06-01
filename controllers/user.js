const User = require("../model/user");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      console.log(err);
      return res.status(403).json({
        error: "User not found in database",
      });
    }
    req.profile = user;
    next();
  });
};
