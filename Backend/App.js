const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/home', (req, res) => {
    res.send('Hello Home!');
});
app.listen(port, () => {
    console.log(`Example app listening at  http://localhost:${port}`);
});

