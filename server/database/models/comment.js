
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: DataTypes.INTEGER,
    articleId: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {});
  // eslint-disable-next-line no-unused-vars
  Comment.associate = (models) => {
    const { User } = models;
    // associations can be defined here
    Comment.belongsTo(User, {
      foreignKey: 'userId',
    });
  };
  return Comment;
};
