
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate({ User, Product }) {
      // define association here
      this.belongsTo(User, { foreignKey: "userId" });
      // this.hasMany(Product, { foreignKey: "ProductId" });

    }
  }
  Order.init(
    {

      productName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Product name is required" },
        },
        trim: true,
      },
      quantity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      shippingAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",

          id: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};

