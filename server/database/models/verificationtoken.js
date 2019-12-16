
module.exports = (sequelize, DataTypes) => {
  const VerificationToken = sequelize.define('VerificationToken', {
    userId: DataTypes.INTEGER,
    token: DataTypes.STRING
  }, {});
  VerificationToken.associate = (models) => {
    const { User } = models;
    // associations can be defined here
    VerificationToken.belongsTo(User, {
      as: 'user',
      foreignKey: 'userId',
      foreignKeyConstraint: true
    });
  };
  return VerificationToken;
};
