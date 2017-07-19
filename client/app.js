google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(buildChart);

const searchBtn = document.querySelector("#search-btn");
const listContainer = document.querySelector("#listContainer");
let financialContainer;

searchBtn.onclick = () => {
  const symbol = document.querySelector("#symbol-input").value;    
  ajax('GET', `/api/stocks?symbol=${symbol}`, (res) => {            
    console.log(res);
  });
};

const ajax = (verb, url, successCallback) => {
  const xhr = new XMLHttpRequest();
  xhr.open(verb, `${url}`);
  xhr.send(null);

  xhr.onreadystatechange = () => {
    const DONE = 4;
    const OK = 200; 
    if (xhr.readyState === DONE) {
      if (xhr.status === OK) {        
        successCallback(xhr.responseText);
      } else {
        console.log('Error: ' + xhr.status);
      }
    }
  };
}

function buildChart() {  
  const dataTable = google.visualization.arrayToDataTable(financialContainer);
  const options = {
    title: '1 Year Performance',
    //curveType: 'function',
    legend: { position: 'bottom' }
  };

  const chart = new google.visualization.LineChart(document.getElementById('chart_div'));
  chart.draw(dataTable, options);
};

const deleteStock = (symbol) => {  
  ajax('DELETE', `/api/stocks?symbol=${symbol}`, (res) => {            
    console.log(res);
  });
};

const clientSocket = new WebSocket("ws://localhost:8080");
clientSocket.onmessage = function (event) {  
  const socketData = JSON.parse(event.data);  
  const stockHash = socketData.reduce((acc, stock) => {            
    // Top row.
    acc['Date'] = acc['Date'] ? [...acc['Date'], stock.symbol] : [stock.symbol];
    stock.dataset.data.map(d => {            
      // If date already exists, add to its collection the current stock's average.
      // If not, create a new collection with the current stock's average.      
      acc[d[0]] = acc[d[0]] ? [...acc[d[0]],d[4]] : [d[4]];              
    });    
    return acc
  }, {});  
    
  financialContainer = Object.keys(stockHash).reduce((acc, row) => {
    const column1 = row === 'Date' ? row : new Date(row);
    return [...acc, [column1, ...stockHash[row]]];
  },[]);
  
  listContainer.innerHTML = '';
  socketData.map(d => {    
    const listItem = `
      <li>
        ${d.symbol}
        <button id="${d.symbol}" onclick="deleteStock('${d.symbol}')">Remove</button>
      </li>
    `;        
    listContainer.innerHTML += listItem;        
  });
}