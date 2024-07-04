require("dotenv").config();
import express, { Application } from 'express';
import cors from 'cors';
import connectDB from './db';
import {syncModels} from "./src/models/modelSync";
import router from "./src/routes/router";
import errorMiddleware from "./src/middlewares/error-middleware";
import * as tf from '@tensorflow/tfjs-node';

const PORT = process.env.PORT || 8080;
const app: Application = express();

app.use(express.json());
app.use(cors({
    credentials: false,
    origin: process.env.CLIENT_URL
}));
app.use("", router);
app.use(errorMiddleware);

async function start(){
    await connectDB();
    await syncModels();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}


start().catch((err: Error) => {
    console.error("Ошибка при запуске сервера: ", err);
});

