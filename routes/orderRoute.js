const express = require("express");
const {
  addToOrder,
  getOrdersByUserId,
} = require("../controllers/orderController");
const { requireSignIn } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.post("/add-to-order/", addToOrder);
router.get("/get-all-order/:userId", getOrdersByUserId);


module.exports = router;
