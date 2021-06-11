const Customer = require("../model/customer");

exports.getCustomerByPhone = (req, res) => {
  if (!req.query.phoneNumber) {
    return res.status(400).json({
      error: "Please enter a phone Number",
    });
  }

  Customer.findOne({ phoneNumber: req.query.phoneNumber }).exec(
    (err, customer) => {
      if (err) {
        return res.status(400).json({
          error: "Something went wrong",
        });
      }
      if (customer == null) {
        return res.status(403).json({
          error: "Customer Not Found in Database",
        });
      }

      return res.json(customer);
    }
  );
};

exports.createCustomer = (req, res) => {
  Customer.findOne({ phoneNumber: req.body.phoneNumber }, (err, customer) => {
    if (err) {
      return res.status(400).json({ error: "Something went wrong" });
    }
    if (customer !== null) {
      customer.name = req.body.name;
      customer.save((err, customer) => {
        if (err) {
          return res.status(400).json({
            error: "Something went wrong",
          });
        }
        return res.json(customer);
      });
    } else {
      let newCustomer = new Customer(req.body);

      newCustomer.save((err, customer) => {
        if (err) {
          return res.status(400).json({
            error: "Something went wrong",
          });
        }
        return res.json(customer);
      });
    }
  });
};

exports.pushBillInCustomer = (req, res) => {
  let bill = req.bill;
  Customer.findByIdAndUpdate(
    bill.customer,
    { $push: { purchase: bill } },
    (err, customer) => {
      if (err) {
        return res.status.json({
          error: "Failed to update customer purchase",
        });
      }
      return res.json(bill);
    }
  );
};
