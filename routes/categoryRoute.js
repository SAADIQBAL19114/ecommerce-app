const express = require("express");

const {
  createCategroyController,
  getAllCategories,
  updateCategroyController,
  singleCategory,
  deleteCategoryController,
} = require("../controllers/categoryController.js");
const { requireSignIn } = require("../middlewares/authMiddleware.js");
const { isAdmin } = require("../middlewares/authMiddleware.js");

const router = express.Router();

// create-category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategroyController
);

// update-category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategroyController
);

// get all categories
router.get("/all-category", getAllCategories);
router.get("/single-category/:id", singleCategory);

// delete category
router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategoryController);

module.exports = router;
