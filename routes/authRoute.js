const express =require("express")
const {registerController, loginController} =require("../controllers/authController.js")

// router Object
const router = express.Router();

// routing

// REGISTER || POST METHOD
router.post("/register",registerController);

//LOGIN || POST
router.post("/login", loginController);

module.exports = router;
