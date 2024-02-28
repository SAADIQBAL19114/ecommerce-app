const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/authController.js");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware.js");

// router Object
const router = express.Router();

// routing

// REGISTER || POST METHOD
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

// test route
router.get("/test",requireSignIn,isAdmin,(req,res) => {
    console.log("protected route")
    res.send({
        message:"protected routes"
    })
});

module.exports = router;
