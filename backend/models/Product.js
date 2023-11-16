import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import DetailTransaction from "./DetailTransaction.js";

const Product = sequelize.define('product', {
    productID:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    stock:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    desc:{
        type: DataTypes.TEXT,
        allowNull: false,
    },
    basePrice:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    sellPrice:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    qtySold:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    category:{
        type: DataTypes.ENUM,
        values: ['monitor', 'CPU', 'keyboard', 'mouse', 'printer', 'harddisk', 'speaker', 'laptop', 'headset'],
        allowNull: false,
    },
    productImg:{
        type: DataTypes.BLOB('long')
    }
},{
    tableName: 'product'
});

Product.hasMany(DetailTransaction);

DetailTransaction.belongsTo(Product);

export default Product;