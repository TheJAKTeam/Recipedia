"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CuisineType extends Model {}

  CuisineType.init(
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
      modelName: "cuisineType",
    }
  );

  CuisineType.associate = (models) => {
    CuisineType.belongsToMany(models.User, { through: "userCuisineTypes" });
  };

  return CuisineType;
};
