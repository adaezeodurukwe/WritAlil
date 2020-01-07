'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    userId: DataTypes.INTEGER,
    followerId: DataTypes.INTEGER
  }, {});
  Follow.associate = function(models) {
    const { User } = models;
    // associations can be defined here

    Follow.belongsTo(User, {
      foreignKey: 'userId',
      as: 'following',
    });

    Follow.belongsTo(User, {
      foreignKey: 'followerId',
      as: 'followers',
    });

  };
  return Follow;
};