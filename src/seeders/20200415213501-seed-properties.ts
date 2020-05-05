'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Properties', [{
        name: 'New property',
        description: 'Random description',
        address: 'Random address',
        propertyType: 'commercial',
        category: 'rent',
        landlordId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        name: 'New property 2',
        description: 'Random description',
        address: 'Random address',
        propertyType: 'commercial',
        category: 'rent',
        landlordId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Properties', null, {});
  }
};
