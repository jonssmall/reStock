const express = require('express');
const app = express();
const http = require('http');
const WebSocket = require('ws');
const Stocks = require('./api/stocks.js');
require('dotenv').config();

let financialContainer = [];

app.use(express.static('client'))

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/client/index.html');
});

app.get('/api/stocks', (req, res) => {    
    const symbol = req.query.symbol;        
    Stocks.getBySymbol(symbol)
        .then(response => {         
            financialContainer.push({'symbol': symbol.toUpperCase(), 'dataset': response.data.dataset});
            let map = new Map();
            for (element of financialContainer) {
                map.set(element.symbol, element);
            }
            let filteredData = [];
            map.forEach( (value, key, map) => {
                filteredData.push(value);
            });
            financialContainer = filteredData; //array of unique objects filtered by symbol.
            broadcastStocks();
            res.json("Done");
        }).catch(error => {            
            console.log(error);
            res.status(500).send('Stock Not Found')
        });
});

app.delete('/api/stocks', (req, res) => {
    const symbol = req.query.symbol;
    financialContainer = financialContainer.filter(d => d.symbol != symbol);    
    broadcastStocks();
    res.status(200).send("Deleted");
});

const broadcastStocks = () => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(financialContainer));
        }
    });
};

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {  
    broadcastStocks();
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});