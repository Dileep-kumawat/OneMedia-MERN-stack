const express = require('express');
const app = express();

const cors = require('cors');
const connectDB = require('./utils/db');
const cookieParser = require('cookie-parser');

const authRouter = require('./routes/auth.route');

const port = 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

connectDB();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})