

$(document).ready(function () {

    testChart();


    function testChart(){
        var chart = new CanvasJS.Chart("chartContainer", {
            title:{
                text: "Chart in CanvasJS"              
            },
            data: [              
            {
                type: "column",
                dataPoints: [
                    { label: "test 1",  y: 10  },
                    { label: "test 1", y: 15  },
                    { label: "test 1", y: 25  },
                    { label: "test 1",  y: 30  },
                    { label: "test 1",  y: 28  }
                ]
            }
            ]
        });
        chart.render();
    }


});

