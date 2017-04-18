const axios = require('axios');


//https.get(`https://www.quandl.com/api/v3/datasets/WIKI/${name}.json?api_key=${process.env.QUANDL_KEY}&start_date=${year - 1}-${month}-${date}&end_date=${year}-${month}-${date}`, res => {}

//Considerations:
//What is a default timeline? 1 year to today? Default arguments?

var Stocks = function () {};

Stocks.prototype.getBySymbol = function (name) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();

    const url = `https://www.quandl.com/api/v3/datasets/WIKI/${name}.json?`
    const parameters = `api_key=${process.env.QUANDL_KEY}&start_date=${year - 1}-${month}-${date}&end_date=${year}-${month}-${date}`

    return axios.get(`${url}${parameters}`)
        .then(response => {            
            return response
        }).catch(error => {
            console.log(error);
        });
};

module.exports = new Stocks();
