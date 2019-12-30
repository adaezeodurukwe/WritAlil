/* eslint-disable strict */

'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Categories', [
    {
      name: 'Story',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Prose',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Poetry',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {
    individualHooks: true
  }),

  down: (queryInterface) => queryInterface.bulkDelete('Categories')
};
