const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebsocket } = require('./websocket');
require('dotenv').config();

const PORT = 3333;

const mongoCred = {
    login: process.env.DB_USER,
    password: process.env.DB_PASS,
    dbName: process.env.DB_NAME,
}

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect(`mongodb+srv://${mongoCred.login}:${mongoCred.password}@cluster0-mrqof.mongodb.net/${mongoCred.dbName}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(PORT);