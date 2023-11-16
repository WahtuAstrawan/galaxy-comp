import sequelize from "../config/database";
import { DataTypes } from "sequelize";
import Transaction from "./Transaction";

const User = sequelize.define('user', {
    userID:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    fullName:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    telephone:{
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    username:{
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    role:{
        type: DataTypes.ENUM,
        values: ['admin', 'cashier'],
        allowNull: false,
    },
    address:{
        type: DataTypes.TEXT,
    },
    profileImg:{
        type: DataTypes.BLOB('long')
    }
});

User.hasMany(Transaction, {
    foreignKey: 'userID'
});

Transaction.belongsTo(User);

User.sync();
export default User;