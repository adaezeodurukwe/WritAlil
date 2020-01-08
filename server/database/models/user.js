/* eslint-disable no-unused-expressions */
/* eslint-disable strict */

import dotenv from 'dotenv';

dotenv.config();

'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      unique: {
        args: true,
        msg: 'User already exist'
      },
      type: DataTypes.STRING
    },
    userName: {
      allowNull: false,
      unique: {
        args: true,
        msg: 'Username already exist'
      },
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    verified: {
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    bioImage: {
      type: DataTypes.STRING,
      defaultValue: process.env.BIO_IMAGE
    }
  }, {});
  User.associate = (models) => {
    const { VerificationToken, Article, Follow } = models;
    // associations can be defined here
    User.hasOne(VerificationToken, {
      as: 'verificationtoken',
      foreignKey: 'userId',
      foreignKeyConstraint: true
    });

    User.hasMany(Article, {
      as: 'articles',
      foreignKey: 'userId',
    });

    User.belongsToMany(User, {
      through: Follow,
      foreignKey: 'userId',
      as: 'following'
    });

    User.belongsToMany(User, {
      through: Follow,
      foreignKey: 'followerId',
      as: 'followers'
    });
  };
  return User;
};
