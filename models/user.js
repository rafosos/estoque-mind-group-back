const Sequelize = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    }, 
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail: true
        }
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = User;