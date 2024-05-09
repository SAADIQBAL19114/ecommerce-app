const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoute.js");
const productRoutes = require("./routes/productRoutes.js");
const categoryRoutes = require("./routes/categoryRoute.js");
const orderRoutes = require("./routes/orderRoute.js");
const cartRoutes = require("./routes/cartRoute.js")
const { sequelize } = require("./sequelize/models");
const cors = require("cors");

// configure env
dotenv.config();

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/order", orderRoutes);

// rest api
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to ecommerce app",
  });
});

//PORT
const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, async () => {
  console.log(
    `server is running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .black
  );
  await sequelize.sync();
  console.log("All models were synchronized successfully.");
  // await sequelize.authenticate()
  // console.log("Data base connected".bgRed .brightWhite);
});
