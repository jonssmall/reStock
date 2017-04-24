const axios = require('axios');

//Default range is 1 year ago through today.
const now = new Date();
const defaultStartDate = {    
    now: now,
    year: now.getFullYear() - 1,
    month: now.getMonth() + 1,
    day: now.getDate(),
};

const defaultEndDate = {
    now: now,
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
};

const Stocks = function () {};
Stocks.prototype.getBySymbol = function (name, startDate = defaultStartDate, endDate = defaultEndDate) {    
    const url = `https://www.quandl.com/api/v3/datasets/WIKI/${name}.json?`
    const parameters = `api_key=${process.env.QUANDL_KEY}&start_date=${startDate.year}-${startDate.month}-${startDate.day}&end_date=${endDate.year}-${endDate.month}-${endDate.day}`

    return axios.get(`${url}${parameters}`)
        .then(response => {            
            return response
        }).catch(error => {            
            console.log(error);
            throw error;
        });
};

module.exports = new Stocks();
