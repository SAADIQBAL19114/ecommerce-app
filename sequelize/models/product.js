'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Category,Cart}) {
      // define association here
      this.belongsTo(Category, { foreignKey: "categoryId" });
      this.hasMany(Cart, { foreignKey: "userId" });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "name is required" },
        },
        trim: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "description is required" },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "price is required" },
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "quantity is required" },
        },
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};