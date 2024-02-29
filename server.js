const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoute.js");
const productRoutes = require("./routes/productRoutes.js");
const categoryRoutes = require("./routes/categoryRoute.js");
const { sequelize } = require("./sequelize/models");

// configure env
dotenv.config();

// rest object
const app = express();

// middlewares
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/category", categoryRoutes);

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
  await sequelize.sync({ alter: true });
  console.log("All models were synchronized successfully.");
  // await sequelize.authenticate()
  // console.log("Data base connected".bgRed .brightWhite);
});
