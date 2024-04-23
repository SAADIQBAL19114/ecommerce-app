const { Product, User, Cart } = require("../sequelize/models");

const addToCart = async (req, res) => {
  try {
    const { pId, uId } = req.params;
     const product = await Product.findByPk(pId);
     if (!product) {
       return res.status(404).json({ error: "Product not found" });
     }
     const user = await User.findByPk(uId);
     if (!user) {
       return res.status(404).json({ error: "User not found" });
     }
     const existingCartItem = await Cart.findOne({
       where: {
         userId: uId,
         productId: pId,
       },
     });

     if (existingCartItem) {
       return res
         .status(400)
         .json({ error: "Product already exists in the cart" });
     }

    const cartItem = await Cart.create({
      userId: uId,
      productId: pId,
      quantity: 1,
    });
    res.status(201).json({
      success: true,
      message: "Cart Created",
      cartItem,
    });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCart = async (req, res) => {
  try {
    const { uId } = req.params;

    const user = await User.findByPk(uId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const cartItems = await Cart.findAll({
      where: {
        userId: uId,
      },
      include: Product, 
    });

    res.status(201).json({
      success: true,
      message: "Cart Items",
      cartItems,
    });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addToCart,
  getCart,
};
