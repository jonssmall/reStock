const searchBtn = document.querySelector("#search-btn");
const financialContainer = [];

searchBtn.onclick = () => {
  const symbol = document.querySelector("#symbol-input").value;  
  ajaxGet(`/api/stocks?symbol=${symbol}`, (res) => {    
    financialContainer.push({'symbol': symbol.toUpperCase(), dataset: res.dataset});
    buildChart(financialContainer);
  });
};

const ajaxGet = (url, successCallback) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${url}`);
  xhr.send(null);

  xhr.onreadystatechange = () => {
    const DONE = 4; 
    const OK = 200; 
    if (xhr.readyState === DONE) {
      if (xhr.status === OK) {        
        successCallback(JSON.parse(xhr.responseText));
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

    dataSeries.dataPoints = dataPoints;
    dataSeries.name = stock.symbol;
    dataSeries.showInLegend = true;  
    chartData.push(dataSeries);
  }      

	const chart = new CanvasJS.Chart("chartContainer",
	{
		zoomEnabled: false,
		animationEnabled: false ,
		title:{
			text: "1 Year Performance" 
		},
		axisX :{
			labelAngle: -30
		},
		axisY :{
			includeZero:false
		},
		data: chartData  
	});

	chart.render();
};