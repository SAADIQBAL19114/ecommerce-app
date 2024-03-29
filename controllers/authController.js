const { hashPassword, comparePassword } = require("../helpers/authHelper");
const { User } = require("../sequelize/models");
const JWT = require("jsonwebtoken");

// regsiter USER
const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    });
    res.status(201).json({
      success: true,
      message: "User Registered",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

// Login USER
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email >>>>>" ,email);
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await User.findOne({where:{ email }});
    console.log("user >>>>>>", user);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

// Get all USERS

const getALlUsersController = async (req, res) => {
  try {
    const user = await User.findAll();
    if (user != "") {
      return res.status(200).json({
        message: "Data Retrieved",
        data: user,
      });
    } else {
      return res.status(400).json({
        message: "no user in the database",
      });
    }
  } catch (error) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

module.exports = {
  registerController,
  loginController,
  getALlUsersController,
};
