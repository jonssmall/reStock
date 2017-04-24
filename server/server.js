const express = require('express');
const app = express();
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

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});