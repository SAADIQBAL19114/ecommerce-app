const express = require("express");

const {
  createCategroyController,
  getAllCategories,
} = require("../controllers/categoryController.js");

const router = express.Router();

router.post("/create-category", createCategroyController);
router.get("/all-category", getAllCategories);

module.exports = router;