import 'dotenv/config.js'; 

import http from 'http';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { initSocket } from './socket.js';
import connectDB from './utils/db.js';
import authRouter from './routes/auth.route.js';
import messageRouter from './routes/message.route.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

connectDB();
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

const server = http.createServer(app);
initSocket(server);

server.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
