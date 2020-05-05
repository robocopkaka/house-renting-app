'use strict';

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync();
const hash = bcrypt.hashSync('password', salt);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'Landlord 1',
      email: 'landlord-1@gmail.com',
      password: hash,
      phoneNumber: '012345678',
      role: 'landlord',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Landlord 2',
      email: 'landlord-2@gmail.com',
      password: hash,
      role: 'landlord',
      phoneNumber: '012345678',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Tenant 1',
      email: 'tenant-1@gmail.com',
      password: hash,
      role: 'tenant',
      phoneNumber: '012345678',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
