import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import {uuid4} from 'uuid';

// Connect to database
mongoose.connect('mongodb://localhost:27017/db_prognet');
console.log('Database terhubung');

const app = express();
const port = 8080;
app.use(cors());
app.use(express.json());

app.use(session({
    secret: uuid4(),
    resave: false,
    saveUninitialized: true,
    })
);

app.listen(port, () => {
    console.log(`Server berjalan di: http://localhost:${port}`);
})

export default app;