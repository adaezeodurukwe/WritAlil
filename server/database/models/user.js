/* eslint-disable strict */
/* eslint-disable no-unused-vars */
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
    const { VerificationToken, Article } = models;
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
  };
  return User;
};
