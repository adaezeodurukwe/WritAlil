
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    userId: DataTypes.INTEGER,
    articleId: DataTypes.INTEGER
  }, {});
  Favorite.associate = (models) => {
    const { Article } = models;
    // associations can be defined here
    Favorite.belongsTo(Article, {
      foreignKey: 'articleId',
    });
  };
  return Favorite;
};
