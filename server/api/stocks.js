//Get stocks from QUANDL.
const axios = require('axios');
const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;
const date = now.getDate();


    //https.get(`https://www.quandl.com/api/v3/datasets/WIKI/${name}.json?api_key=${process.env.QUANDL_API_KEY}&start_date=${year - 1}-${month}-${date}&end_date=${year}-${month}-${date}`, res => {}

//Considerations:
//What is a default timeline? 1 year to today? Default arguments?

var Stocks = function () {};

Stocks.prototype.getBySymbol = function () {
    console.log('hello, stocks!');
};

module.exports = new Stocks();
