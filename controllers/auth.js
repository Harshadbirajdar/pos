const User = require("../model/user");
const { validationResult } = require("express-validator");
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");

// Signup method
exports.signup = (req, res) => {
  const user = new User(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "Username is Already Exist....",
      });
    }
    res.json(user);
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { userName, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ userName }, (err, user) => {
    if (err) {
      return res.status(400).json({
        error: "Something went wrong",
      });
    }
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    } else {
      if (!user.autheticated(password)) {
        return res.status(400).json({
          error: "username and password does not match",
        });
      }
      const token = jwt.sign({ _id: user._id }, process.env.SECRET);
      res.cookie("token", token, { expire: new Date() + 2 });

      const { _id, name, userName, role } = user;
      return res.json({ token, user: { _id, name, userName, role } });
    }
  });
};

exports.isSignIn = expressJwt({
  secret: process.env.SECRET,
  algorithms: ["sha1", "RS256", "HS256"],
  userProperty: "auth",
});

exports.checkToken = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    console.log(err.inner.message);
    res.status(401).json({
      error: err.inner.message,
    });
  }
  next();
};

exports.isSuperAdmin = (req, res, next) => {
  if (!req.profile.role >= 5) {
    return res.status(400).json({
      error: "You do not have right to access this data",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  if (!req.profile.role >= 4) {
    return res.status(401).json({
      error: "Your are not admin",
    });
  }
  next();
};

exports.isManager = (req, res, next) => {
  if (req.profile.role < 3) {
    return res.status(401).json({
      error: "You do not have right to access this data",
    });
  }
  next();
};
exports.isSaleSupervisor = (req, res, next) => {
  if (req.profile.role < 2) {
    return res.status(401).json({
      error: "You do not have right to access this data",
    });
  }
  next();
};
exports.isCashier = (req, res, next) => {
  if (req.profile.role < 1) {
    return res.status(401).json({
      error: "You do not have right to access this data",
    });
  }
  next();
};

exports.isAuthinticated = (req, res, next) => {
  let chekar = req.profile && req.auth && req.profile._id == req.auth._id;

  if (!chekar) {
    return res.status(403).json({
      error: "Access is deine",
    });
  }

  next();
};
