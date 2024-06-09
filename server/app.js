const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(cors());

app.use(bodyParser.json());

mongoose.connect(process.env.DB_URL).then(()=>{
    console.log('Mongoose Connected');
}).catch((error)=>{
    console.log(error.message);
})

const { verifyUser } = require('./middlewares/auth');

const userRouter = require('./routes/users');
app.use('/users', verifyUser, userRouter);

const authRouter = require('./routes/auth');
app.use('/auth', verifyUser, authRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));