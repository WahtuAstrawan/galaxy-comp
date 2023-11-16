import sequelize from "../config/database";
import { DataTypes } from "sequelize";

const DetailTransaction = sequelize.define('detailTransaction', {
    detailTransactionID:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    transactionID:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'transaction',
            key: 'transactionID',
        },
    },
    productID:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'product',
            key: 'productID',
        },
    },
    buyQty:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    subTotal:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }
});

DetailTransaction.sync();
export default DetailTransaction;