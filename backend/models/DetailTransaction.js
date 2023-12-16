import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const DetailTransaction = sequelize.define('detail_transaction', {
    detailTransactionID:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    buyQty:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    subTotal:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }
},
{
    tableName: 'detail_transaction',
});

export default DetailTransaction;