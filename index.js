require("dotenv").config()
const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/auth');
const produtoRouter = require('./routes/produto');
const userRouter = require("./routes/user");

const app = express();
app.use(express.json());
app.use(cors());
app.use('/auth', authRouter);
app.use('/produto', produtoRouter);
app.use('/user', userRouter);

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => console.log(`Server running on port ${port}`));