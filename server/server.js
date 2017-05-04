const express = require('express');
const app = express();
const http = require('http');
const WebSocket = require('ws');
const Stocks = require('./api/stocks.js');
require('dotenv').config();

app.use(express.static('client'))

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/client/index.html');
});

app.get('/api/stocks', (req, res) => {    
    Stocks.getBySymbol(req.query.symbol)
        .then(response => {                      
            res.json(response.data);
        }).catch(error => {            
            console.log(error);
            res.status(500).send('Stock Not Found')
        });
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
    console.log("Someone connected");
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });
    ws.send('something');
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});