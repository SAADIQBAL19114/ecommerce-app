'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
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
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Categories",
          id: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("Products");
  },
};