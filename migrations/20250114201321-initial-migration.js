'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('produtos', 'imagem', { 
      type: Sequelize.BLOB("medium"),
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('produtos', 'imagem', { 
      type: Sequelize.BLOB,
    });
  }
};
