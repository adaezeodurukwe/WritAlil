
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('VerificationTokens', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onUpdate: 'cascade',
      onDelete: 'cascade',
      references: {
        model: 'Users',
        key: 'id'
      },
    },
    token: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('VerificationTokens')
};
