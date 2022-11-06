'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING
    },
    fname: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'User',
  });
  return User;
};