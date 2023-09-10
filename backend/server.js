const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 8069;
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "prognet",
})

app.get('/', (req, res) => {
    return res.json("Halo Dunia");
})

app.get('/users', (req, res) => {
    const query = "SELECT * FROM users";
    db.query(query, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.listen(port, () => {
    console.log(`Berjalan di port: ${port}`);
})