"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Order, Product }) {
      // define association here
      // this.belongsTo(Order, { foreignKey: "OrderId" });
      // this.belongsTo(Product, { foreignKey: "ProductId" });
    }
  }
  ProductDetails.init(
    {
      stock: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      size: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Products",
          id: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "ProductDetails",
    }
  );
  return ProductDetails;
};
