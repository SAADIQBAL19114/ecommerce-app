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

const updateCart = async (req, res) => {
  try {
    const { uId } = req.params;
    const cartItems = req.body.cart;
    const updatedCartItems = await Promise.all(
      cartItems.map(async (item) => {
        const cartItem = await Cart.findOne({
          where: {
            userId: uId,
            productId: item.productId,
          },
        });

        if (!cartItem) {
          return res.status(404).json({
            error: `Cart item with productId ${item.productId} not found for user ${uId}`,
          });
        }

        cartItem.quantity = item.quantity;
        await cartItem.save();
        return cartItem;
      })
    );

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      updatedCartItems,
    });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { uId, pId } = req.params;

    const cartItem = await Cart.findOne({
      where: {
        userId: uId,
        productId: pId,
      },
    });

    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    await cartItem.destroy();

    res.status(200).json({
      success: true,
      message: "Cart item deleted successfully",
      cartItem,
    });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  addToCart,
  getCart,
  updateCart,
  deleteCartItem,
};
