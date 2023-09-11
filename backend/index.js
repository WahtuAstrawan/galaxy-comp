import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import UserRoute from './routes/UserRoute.js';

const app = express();
const port = 8069;
app.use(cors());
app.use(express.json());
app.use(UserRoute);

app.get('/', (req, res) => {
    return res.json("Halo Dunia");
})

app.listen(port, () => {
    console.log(`Berjalan di port: ${port}`);
})