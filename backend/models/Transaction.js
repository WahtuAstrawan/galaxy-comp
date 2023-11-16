import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import DetailTransaction from "./DetailTransaction.js";

const Transaction = sequelize.define('transaction', {
    transactionID:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    transactionDate:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    customerName:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    totalPrice:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    payMethod:{
        type: DataTypes.ENUM,
        values: ['cash', 'bank', 'qris'],
        allowNull: false,
    },
    totalPay:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    changes:{
        type: DataTypes.DECIMAL(10, 2),
    },
},{
    tableName: 'transaction'
});

Transaction.hasMany(DetailTransaction);

DetailTransaction.belongsTo(Transaction);

export default Transaction;