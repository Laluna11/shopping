const {Sequelize, DataTypes} = require("sequelize");

const sequelize = new Sequelize(
    'shopping',
    'root',
    '',
     {
       host: 'localhost',
       dialect: 'mysql',

     }
);

module.exports = sequelize 