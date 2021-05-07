"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      hashedPassword: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );

  User.associate = (models) => {
    User.belongsToMany(models.SavedRecipe, { through: "userSavedRecipes" });
    User.belongsToMany(models.Diet, { through: "userDiets" });
    User.belongsToMany(models.HealthLabel, { through: "userHealthLabels" });
    User.belongsToMany(models.CuisineType, { through: "userCuisineTypes" });
    User.belongsToMany(models.MealType, { through: "userMealTypes" });
    User.belongsToMany(models.DishType, { through: "userDishTypes" });
    User.belongsToMany(models.ExcludedIngredient, { through: "userExcludedIngredients" });
  };

  return User;
};
