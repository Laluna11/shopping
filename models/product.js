const sequelize = require("../database")
const {DataTypes} = require("sequelize");
    const Product = sequelize.define(
    "Product",
    {
        productId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
        
    },
    {
        tableName: "product",
        paranoid: false,
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
    }
    );

    //clear database

    // Product.sync({
    //     force: true
    // })
    
   
    module.exports =  Product;
