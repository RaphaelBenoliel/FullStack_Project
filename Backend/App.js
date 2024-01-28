const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT

const studentRoute = require('./routes/student_route');
const postRoute = require('./routes/post_route');

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (err) =>console.log(err));
db.once('open', () => console.log('Connected to DB'));


app.use('/student', studentRoute);
app.use('/post', postRoute);




app.listen(port, () => {
    console.log(`Example app listening at  http://localhost:${port}`);
});

