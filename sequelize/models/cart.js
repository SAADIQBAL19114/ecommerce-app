"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Product }) {
      // define association here
      this.belongsTo(User, { foreignKey: "userId" });
      this.belongsTo(Product, { foreignKey: "userId" });
    }
  }
  Cart.init(
    {
      quantity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
