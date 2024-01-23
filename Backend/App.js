const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT

const studentRoute = require('./routes/student_route');
app.use('/student', studentRoute);
const postRoute = require('./routes/post_route');
app.use('/post', postRoute);




app.listen(port, () => {
    console.log(`Example app listening at  http://localhost:${port}`);
});

