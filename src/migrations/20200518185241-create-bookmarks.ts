'use strict';
// tslint:disable: variable-name
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Bookmarks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId : {
        type: Sequelize.INTEGER,
        references: {
          model : 'Users',
          key : 'id'
        }
      },
      propertyId: {
        type: Sequelize.INTEGER,
        references: {
          model : 'Properties',
          key : 'id'
        }
      }
    });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('Bookmarks');
  }
};
