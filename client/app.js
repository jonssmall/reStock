const searchBtn = document.querySelector("#search-btn");
searchBtn.onclick = () => {
  const symbol = document.querySelector("#symbol-input").value;  
  ajaxGet(`/api/stocks?symbol=${symbol}`);
};

const ajaxGet = (url) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${url}`);
  xhr.send(null);

  xhr.onreadystatechange = () => {
    const DONE = 4; 
    const OK = 200; 
    if (xhr.readyState === DONE) {
      if (xhr.status === OK) {
        console.log(xhr.responseText);
      } else {
        console.log('Error: ' + xhr.status);
      }
    }
  };
}

window.onload = function () {
	var chart = new CanvasJS.Chart("chartContainer",
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
}

var limit = 100000;    

var y = 0;
var data = []; 
var dataSeries = { type: "line" };
var dataPoints = [];
for (var i = -limit/2; i <= limit/2; i++) {
  y += (Math.random() * 10 - 5);
  dateTime = new Date(1960, 08, 15);

  // dateTime.setMilliseconds(dateTime.getMilliseconds() + i);
  // dateTime.setSeconds(dateTime.getSeconds() + i);
  // dateTime.setMinutes(dateTime.getMinutes() + i);
  // dateTime.setHours(dateTime.getHours() + i);
  dateTime.setDate(dateTime.getDate() + i);
  // dateTime.setMonth(dateTime.getMonth() + i);
  // dateTime.setFullYear(dateTime.getFullYear() + i);

  dataPoints.push({
    x: dateTime,
    y: y
  });
}

dataSeries.dataPoints = dataPoints;
data.push(dataSeries);    

// response.data =  [
//       [
//         "2017-04-20", date
//         142.95,
//         144.25,
//         142.689,
//         143.8, close
//         15509334,
//         0,
//         1,
//         142.95,
//         144.25,
//         142.689,
//         143.8,
//         15509334
//       ], ...