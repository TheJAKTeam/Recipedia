"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SavedRecipe extends Model {}

  SavedRecipe.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      recipeIdBase64: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "savedRecipe",
    }
  );

  SavedRecipe.associate = (models) => {
    SavedRecipe.belongsToMany(models.User, { through: "userSavedRecipes" });
  };

  return SavedRecipe;
};
