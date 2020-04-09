'use strict';
const { DataTypes } = require('sequelize');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Properties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      propertyType: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.TEXT
      },
      address: {
        type: DataTypes.STRING
      },
      features: {
        type: DataTypes.ARRAY(DataTypes.STRING)
      },
      available: {
        type: DataTypes.BOOLEAN
      },
      category: {
        type: DataTypes.STRING
      },
      uid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      landlordId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Landlords',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Properties');
  }
};
