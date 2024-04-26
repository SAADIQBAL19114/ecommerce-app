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

    await Cart.create({
      userId: uId,
      productId: pId,
      quantity: 1,
    });

    const resp = await getCartItems(uId);
    console.log("resp", resp);
    res.status(201).json({
      success: true,
      message: "Cart Created",
      cartItem: resp,
    });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCartItems = async (uId) => {
  try {
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
    return cartItems;
  } catch (error) {
    console.error("Error fetching cart items:", error);
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
    console.log("res Get: ", res);
    return res;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateCart = async (req, res) => {
  try {
    const { uId } = req.params;
    const cartItems = req.body.cart;
    console.log("cartItems", cartItems);
    console.log("Id", uId);
    const updatedCartItems = await Promise.all(
      cartItems.map(async (item) => {
        const cartItem = await Cart.findOne({
          where: {
            userId: uId,
            productId: item.productId,
          },
        });

        console.log("cartItem", cartItem);

        if (!cartItem) {
          return res.status(401).json({
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
