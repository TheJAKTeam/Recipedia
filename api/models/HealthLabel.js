"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class HealthLabel extends Model {}

  HealthLabel.init(
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
      modelName: "healthLabel",
    }
  );

  HealthLabel.associate = (models) => {
    HealthLabel.belongsToMany(models.User, { through: "userHealthLabels" });
  };

  return HealthLabel;
};
