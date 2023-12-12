import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { v4 as uuidv4} from 'uuid';

import sequelize from './config/database.js';

import EmployeeRouter from './routes/Employee.js';
import ProductRouter from './routes/Product.js';
import DashboardRouter from './routes/Dashboard.js';
import TransactionRouter from './routes/Transaction.js';

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(
    session({
        secret: uuidv4(),
        resave: false,
        saveUninitialized: true,
    })
);

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

app.use("/employee", EmployeeRouter);
app.use("/product", ProductRouter);
app.use("/dashboard", DashboardRouter);
app.use("/transaction", TransactionRouter)

export default app;