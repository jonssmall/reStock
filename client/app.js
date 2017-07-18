const searchBtn = document.querySelector("#search-btn");
const listContainer = document.querySelector("#listContainer");
const financialContainer = [];

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

const buildChart = (financialContainer) => {
  let chartData = [];
  
  for(stock of financialContainer) {
    let dataSeries = { type: "line" };
    let dataPoints = [];
    stock.dataset.data.map(point => {
      dataPoints.push({
        x: new Date(point[0]),        
        y: point[4]
      });
    });  
    //console.log(JSON.stringify(dataPoints));    
    dataSeries.showInLegend = true;
    dataSeries.name = stock.symbol;
    dataSeries.legendText = stock.symbol;
    dataSeries.dataPoints = dataPoints;        
    chartData.push(dataSeries);
  }
  //console.log(chartData);
	const chart = new CanvasJS.Chart("chartContainer",
	{
		//zoomEnabled: false,
		//animationEnabled: false ,
		title:{
			text: "1 Year Performance" 
		},
    data: chartData,
		axisX :{
			labelAngle: -30
		},
		axisY :{
			includeZero:false
		}		
	});

	chart.render();
};

const deleteStock = (symbol) => {  
  ajax('DELETE', `/api/stocks?symbol=${symbol}`, (res) => {            
    console.log(res);
  });
};

var clientSocket = new WebSocket("ws://localhost:8080");

clientSocket.onmessage = function (event) {  
  const socketData = JSON.parse(event.data); // [{symbol:"fb", dataset: obj}, ...]
  //buildChart(socketData);
  //console.log(socketData);
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