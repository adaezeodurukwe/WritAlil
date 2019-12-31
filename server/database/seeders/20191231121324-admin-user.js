/* eslint-disable strict */

'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [
    {
      firstName: 'Jane Doe',
      lastName: 'dee',
      email: 'deedee@gmail.com',
      userName: 'theAdmin',
      bioImage: 'https://res.cloudinary.com/aoimageupload/image/upload/v1577798036/Portrait_Placeholder.png',
      password: '$2y$08$mTQMly7kyfnM1gJhy2nSJO1IUmB8V2AJ.prcGgdBBYdjXObXCcmc6',
      verified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }]),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {})
};
