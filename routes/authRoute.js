const express = require("express");
const {
  registerController,
  loginController,
  getALlUsersController,
} = require("../controllers/authController.js");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware.js");

// router Object
const router = express.Router();

// routing

// REGISTER || POST METHOD
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController );

// GET ALL USERS || GET
router.get("/user", getALlUsersController);

// test route
router.get("/test", requireSignIn, isAdmin, (req, res) => {
  console.log("protected route");
  res.send({
    message: "protected routes",
  });
});

//protected route auth (USER)
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected route auth (ADMIN)
router.get("/admin-auth", requireSignIn,isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

module.exports = router;
