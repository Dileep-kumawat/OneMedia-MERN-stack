const express = require('express')
const app = express()
const cors = require('cors')
const authRouter = require('./routes/auth.route')
const connectDB = require('./utils/db');
const cookieParser = require('cookie-parser');
const videoUploadRoute = require('./routes/upload');

const port = 3000

app.use(cors({
    origin: 'https://onemedia-dileep.netlify.app',
    credentials: true
}));

connectDB();
app.use(express.json());
app.use(cookieParser());
app.use('/api/upload', videoUploadRoute);


app.use("/api/auth", authRouter);

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})