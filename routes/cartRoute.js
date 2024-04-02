const express = require("express");
const { addToCart } = require("../controllers/cartController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware.js");



const router = express.Router();

router.post("/add-to-cart/:pId/:uId",addToCart)

module.exports = router;