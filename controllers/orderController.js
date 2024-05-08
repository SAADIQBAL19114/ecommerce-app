const { Order } = require("../sequelize/models");
const nodemailer = require("nodemailer");

const addToOrder = async (req, res) => {
  try {
    const orderItems = req.body;
    const createdOrderItems = [];
    const { email } = orderItems[0];
    for (const item of orderItems) {
      const { name, price, userId, shippingAddress } = item;
      const { quantity } = item;

      if (!name || !price || !userId || !shippingAddress || !quantity) {
        return res
          .status(400)
          .json({ success: false, error: "Incomplete data" });
      }

      const orderItem = await Order.create({
        productName: name,
        price,
        quantity,
        userId,
        shippingAddress,
      });

      createdOrderItems.push(orderItem);
    }
    res.status(201).json({ success: true, data: createdOrderItems });

    // nodemailer code

    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: "saad.algolix@gmail.com",
        pass: "mqfq rwmz tnkr qoji",
      },
    });

    // Setup email data with unicode symbols
    let mailOptions = {
      from: "Gondal Store", // sender address (can be imaginary)
      to: `${email}`, // list of receivers
      subject: "Order Info", // Subject line
      text: "Thanks for the order", // plain text body
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.findAll({ where: { userId } });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
module.exports = {
  addToOrder,
  getOrdersByUserId,
};
