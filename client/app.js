const searchBtn = document.querySelector("#search-btn");
searchBtn.onclick = () => {
  const symbol = document.querySelector("#symbol-input").value;  
  ajaxGet(`/api/stocks?symbol=${symbol}`, (res) => {
    buildChart(res.dataset);
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
        //console.log(xhr.responseText);
        successCallback(JSON.parse(xhr.responseText));
      } else {
        console.log('Error: ' + xhr.status);
      }
    }
  };
}

const buildChart = (dataset) => {
  let data = [];
  let dataSeries = { type: "line" };
  let dataPoints = [];

  dataset.data.map(point => {
    dataPoints.push({
      x: new Date(point[0]),
      y: point[4]
    });
  });  

  dataSeries.dataPoints = dataPoints;
  data.push(dataSeries);
  console.log(data);

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
		data: data  
	});
	chart.render();
};