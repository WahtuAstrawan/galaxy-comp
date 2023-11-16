import sequelize from "../config/database";
import { DataTypes } from "sequelize";
import DetailTransaction from "./DetailTransaction";

const Transaction = sequelize.define('transaction', {
    transactionID:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    userID:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'userID',
        },
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
});

Transaction.hasMany(DetailTransaction, {
    foreignKey: 'transactionID'
});

DetailTransaction.belongsTo(Transaction);

Transaction.sync();
export default Transaction;