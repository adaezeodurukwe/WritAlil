/* eslint-disable strict */
/* eslint-disable no-unused-vars */

'use strict';

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING
  }, {});
  Category.associate = (models) => {
    // associations can be defined here
  };
  return Category;
};
