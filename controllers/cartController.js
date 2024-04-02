const { Product, User, Cart } = require("../sequelize/models");

const addToCart = async (req, res) => {
  try {
    const { pId, uId } = req.params;


    const product = await Product.findOne({ where: { id: pId } });
    console.log("product", product);
    const user = await User.findOne({ where: { id: uId } });
    console.log("user", user);

    if (!user || !product) {
      return res.status(404).json({ error: "User or category not found." });
    }

    // Add item to cart
    const cartItem = await Cart.create({
      userId: user.id,
      productId: product.id,
      quantity: product.quantity,
      Total: 100,
    });

    res.status(201).json(cartItem);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addToCart,
};
