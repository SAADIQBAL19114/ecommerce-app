const express = require ("express")
const colors = require("colors")
const dotenv = require("dotenv")
const morgan = require("morgan")
const authRoutes =require("./routes/authRoute.js")
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
// rest api
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to ecommerce app",
  });
});

//PORT
const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, async() => {
  console.log(
    `server is running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .black
  );
  await sequelize.authenticate()
  console.log("Data base connected".bgRed .brightWhite);
});
