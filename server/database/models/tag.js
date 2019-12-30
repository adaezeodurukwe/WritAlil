/* eslint-disable no-unused-vars */
/* eslint-disable strict */

'use strict';

module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: DataTypes.STRING
  }, {});
  Tag.associate = (models) => {
    // associations can be defined here
  };
  return Tag;
};
