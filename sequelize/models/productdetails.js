'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
      email2: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "ProductDetails",
    }
  );
  return ProductDetails;
};