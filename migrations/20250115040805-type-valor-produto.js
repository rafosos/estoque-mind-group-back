'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('produtos', 'valor', { 
      type: Sequelize.DECIMAL(10,2),
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('produtos', 'valor', { 
      type: Sequelize.DECIMAL,
    });
  }
};