import express from 'express';
import cors from 'cors';
import session from 'express-session';
import sequelize from './config/database.js';
import Employee from './models/Employee.js';
import Product from './models/Product.js';
import Transaction from './models/Transaction.js';
import DetailTransaction from './models/DetailTransaction.js';

const app = express();
const port = 8080;
app.use(cors());
app.use(express.json());

try {
    await sequelize.authenticate();
    console.log("Database berhasil terhubung!");
} catch (error) {
    console.log(`Tidak dapat terhubung ke database error : ${error}`);
}


try {
    await sequelize.sync();
    console.log("Database disinkronkan!");
} catch (error) {
    console.log(`Gagal menyingkronkan database error : ${error}`);
}

app.listen(port, () => {
    console.log(`Server berjalan di: http://localhost:${port}`);
})

export default app;