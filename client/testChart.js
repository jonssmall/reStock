var dps1 = [{ x: new Date(2014, 02, 07, 15, 00, 10), y: 5 }, { x: new Date(2014, 02, 07, 15, 30, 10), y: 6 }, { x: new Date(2014, 02, 07, 17, 00, 10), y: -2 }];
var dps2 = [{ x: new Date(2014, 02, 07, 17, 30, 10), y: 10.5 }, { x: new Date(2014, 02, 07, 18, 00, 10), y: 12.6 }, { x: new Date(2014, 02, 07, 20, 00, 10), y: 20 }];
var dps3 = [{ x: new Date(2014, 02, 07, 12, 40, 10), y: 7.5 }, { x: new Date(2014, 02, 07, 14, 00, 10), y: 6.6 }, { x: new Date(2014, 02, 07, 16, 00, 10), y: -5 }];
var dps4 = [{ x: new Date(2014, 02, 07, 11, 10, 10), y: 8.5 }, { x: new Date(2014, 02, 07, 15, 00, 10), y: 9.6 }, { x: new Date(2014, 02, 07, 17, 00, 10), y: -4 }];


var chart = new CanvasJS.Chart("chartContainer",
    {  
      
      title:{
        text: "A Multi-series Line Chart with Legend on a Date Time Axis"
      
      },   
      data: [{        
        type: "line",
        showInLegend: true,
        dataPoints: dps1,
        name: "DS 1"
      },
      {        
        type: "line",
        showInLegend: true,
        dataPoints: dps2,
        name: "DS 2"
      },
      {        
        type: "line",
        showInLegend: true,
        dataPoints: dps3,
        name: "DS 3"
      },
      {        
        type: "line",
        showInLegend: true,
        dataPoints: dps4,
        name: "DS 4"
      }        
      ]
    });

chart.render();