const Sequelize = require("sequelize");
const sequelize = require("../db");
const User = require("./user");

const Produto = sequelize.define('produto', {
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
    descricao: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    imagem:{
        type: Sequelize.BLOB,
        allowNull: true
    },
    valor:{
        type: Sequelize.DECIMAL,
        allowNull: true,
        validate:{
            min: 0,
        }
    },
    quantidade:{
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:{
            min: 0
        }
    }
});

User.hasMany(Produto);
Produto.belongsTo(User);

module.exports = Produto;