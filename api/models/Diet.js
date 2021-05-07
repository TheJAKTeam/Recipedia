"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Diet extends Model {}

  Diet.init(
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
      modelName: "diet",
    }
  );

  Diet.associate = (models) => {
    Diet.belongsToMany(models.User, { through: "userDiets" });
  };

  return Diet;
};
