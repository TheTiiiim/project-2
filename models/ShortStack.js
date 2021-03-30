const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ShortStack extends Model {}

ShortStack.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    exhibit_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'exhibit',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'shortStack',
    paranoid: true
  }
);

module.exports = ShortStack;