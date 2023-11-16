import sequelize from "../config/database";
import { DataTypes } from "sequelize";
import DetailTransaction from "./DetailTransaction";

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
});

Product.hasMany(DetailTransaction, {
    foreignKey: 'productID'
});

DetailTransaction.belongsTo(Product);

Product.sync();
export default Product;