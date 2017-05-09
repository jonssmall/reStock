const express = require('express');
const app = express();
const http = require('http');
const WebSocket = require('ws');
const Stocks = require('./api/stocks.js');
require('dotenv').config();

let symbolContainer = [];

app.use(express.static('client'))

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/client/index.html');
});

app.get('/api/stocks', (req, res) => {    
    const symbol = req.query.symbol;        
    Stocks.getBySymbol(symbol)
        .then(response => {         
            symbolContainer.push(symbol.toUpperCase());
            symbolContainer = [ ...new Set(symbolContainer) ] //es6 array filtered for uniques                         
            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(symbolContainer));
                }
            });
            res.json(response.data);
        }).catch(error => {            
            console.log(error);
            res.status(500).send('Stock Not Found')
        });
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {  
    wss.clients.forEach(function each(client) {
        if (client == ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(symbolContainer));
        }    
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});