
const express = require("express");
const {
  addToCart,
  getCart,
  updateCart,
  deleteCartItem,
  deleteAllCartItems,
} = require("../controllers/cartController");
const { requireSignIn,} = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.post("/add-to-cart/:pId/:uId",requireSignIn, addToCart);
router.get("/get/:uId",requireSignIn, getCart);
router.put("/update-cart/:uId",requireSignIn, updateCart);
router.delete("/delete-cart/:pId/:uId",requireSignIn, deleteCartItem);
router.delete("/delete-all/:uId", deleteAllCartItems);

module.exports = router;
