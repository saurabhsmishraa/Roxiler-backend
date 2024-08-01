import dotenv from 'dotenv';
import express, { json } from 'express';
import bodyParser from 'body-parser';
import { mongoConnect } from './database/mongoConnect.js';
const app = express();

dotenv.config();

import apiRoutes from './routes/routes.js'


mongoConnect();
app.use(bodyParser.json());
app.use(express.json());
app.use('/', apiRoutes);



app.get('/', (req, res) => {
    res.status(200);
    res.send("Welcome to root URL of Server");
});

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
});