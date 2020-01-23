const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const porta = 3333;

const mongoCred = {
    login: 'CHANGEHERE',
    password: 'CHANGEHERE',
    dbName: 'CHANGEHERE',
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

server.listen(porta);