const express = require("express");
const { addToCart, getCart } = require("../controllers/cartController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.post("/add-to-cart/:pId/:uId", addToCart);
router.get("/get/:uId", getCart);

module.exports = router;
