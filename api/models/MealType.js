"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MealType extends Model {}

  MealType.init(
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
      modelName: "mealType",
    }
  );

  MealType.associate = (models) => {
    MealType.belongsToMany(models.User, { through: "userMealTypes" });
  };

  return MealType;
};
