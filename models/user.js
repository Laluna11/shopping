const sequelize = require("../database")
const { DataTypes} = require("sequelize");

    const User = sequelize.define(
    "User",
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
        
    },
    {
        tableName: "user",
        paranoid: false,
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
    }
    );
    // User.sync({
    //     force: true
    // })
    

    module.exports =  User;
