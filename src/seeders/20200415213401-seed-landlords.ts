'use strict';

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync();
const hash = bcrypt.hashSync('password', salt);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Landlords', [{
      name: 'New property',
      email: 'landlord-1@gmail.com',
      password: hash,
      phoneNumber: '012345678',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'New property',
      email: 'landlord-2@gmail.com',
      password: hash,
      phoneNumber: '012345678',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Landlords', null, {});
  }
};
