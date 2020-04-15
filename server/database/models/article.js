/* eslint-disable strict */
/* eslint-disable no-unused-vars */

'use strict';

module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    userId: DataTypes.INTEGER,
    slug: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    body: DataTypes.STRING,
    readTime: DataTypes.STRING,
    category: DataTypes.INTEGER,
    coverImage: {
      type: DataTypes.STRING,
    },
    tags: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {});
  Article.associate = (models) => {
    const { User, Category } = models;
    // associations can be defined here
    Article.belongsTo(User, {
      foreignKey: 'userId',
    });

    Article.hasOne(Category, {
      foreignKey: 'category'
    });
  };
  return Article;
};
