require("dotenv").config()
const express = require('express');
const authRouter = require('./routes/auth');
const produtoRouter = require('./routes/produto');
const userRouter = require("./routes/user");

const app = express();
app.use(express.json());
app.use('/auth', authRouter);
app.use('/produto', produtoRouter);
app.use('/user', userRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));