'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Product}) {
      // define association here
      this.belongsTo(User, { foreignKey: "userId"});
      this.hasMany(Product, { foreignKey: "ProductId" });
    }
  }
  Order.init(
    {
      status: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          id: "id",
        },
      },
      ProductDetailId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "ProductDetails",
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