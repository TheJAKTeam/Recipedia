"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ExcludedIngredients extends Model {}

  ExcludedIngredients.init(
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
      modelName: "excludedIngredient",
    }
  );

  ExcludedIngredients.associate = (models) => {
    ExcludedIngredients.belongsToMany(models.User, { through: "userExcludedIngredients" });
  };

  return ExcludedIngredients;
};
