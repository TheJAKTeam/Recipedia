"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class DishType extends Model {}

  DishType.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "dishType",
    }
  );

  DishType.associate = (models) => {
    DishType.belongsToMany(models.User, { through: "userDishTypes" });
  };

  return DishType;
};
