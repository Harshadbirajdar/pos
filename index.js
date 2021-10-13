const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

// Port declare
const port = process.env.PORT || 4000;

// Routes

const userRoute = require("./routes/user");
const supplierRoute = require("./routes/supplier");
const categoryRoute = require("./routes/category");
const productRoute = require("./routes/product");
const customerRoute = require("./routes/customer");
const salesmanRoute = require("./routes/salesman");
const billRooute = require("./routes/bill");
const categoryBarcode = require("./routes/categoryBarcode");
const exchangeRoute = require("./routes/exchange");
const locationRoute = require("./routes/location");
// DB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

// MiddleWare
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// routes
app.use("/api", userRoute);
app.use("/api", supplierRoute);
app.use("/api", categoryRoute);
app.use("/api", productRoute);
app.use("/api", customerRoute);
app.use("/api", salesmanRoute);
app.use("/api", billRooute);
app.use("/api", categoryBarcode);
app.use("/api", exchangeRoute);
app.use("/api", locationRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// start server
app.listen(port, () => {
  console.log(`App is Running at Port ${port}`);
});
