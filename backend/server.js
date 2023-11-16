import express from 'express';
import cors from 'cors';
import session from 'express-session';
import {uuid4} from 'uuid';
import sequelize from './config/database';

const app = express();
const port = 8080;
app.use(cors());
app.use(express.json());

try {
    await sequelize.authenticate();
    console.log("Database berhasil terhubung!");
} catch (error) {
    console.error("Tidak dapat terhubung ke database", error);
}

app.listen(port, () => {
    console.log(`Server berjalan di: http://localhost:${port}`);
})

export default app;