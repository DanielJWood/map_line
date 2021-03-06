var test1 = [[1970,1971,1972,1973,1974,1975,1976,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010, 2011, 2012]];

var items = [[1,2],[3,4],[5,6]];

(function ($) { 
$( document ).ready(function() {


onClickyhigh();

});
}(jQuery));  


(function ($) { 

$(function () {
        $('#alaska').click(function(e) {
            map.fitBounds([
            [71.3516, -188.90491],[51.3516, -129.986]
            ]);

        });
        $('#hawaii').click(function(e) {
            map.fitBounds([
            [22.2289, -154.8],[18.948, -159.764]
            ]);
            selectstate();

        });
        $('#usa').click(function(e) {
            map.fitBounds([
            [42.461, -56.979],[32.536, -134.4]
            ]);
            var e = null;
            $('.legendz').removeClass('active')
            p = 0;
            onClickyhigh();
            selectstate();
        });
    });
}(jQuery));  

function selectstate() {
            if (activedom !== undefined) {
                activedom.setStyle({
                    weight: 1,
                    dashArray: '3',
                    fillOpacity: '0.7'
                });
            } 
}

function onClickyhigh(e) {

if (e != null) {
    var layer = e.target.feature;
}
else {
    var layer = statesData.features[51];
};

var expend = document.getElementById('expend');
var statename = document.getElementById('statename');
var statename2 = document.getElementById('statename2');
var legend_name = document.getElementById('legend_name');



//add current value to box at lower left.
expend.innerHTML = '$' + layer.properties.total[42];
statename.innerHTML = layer.properties.name;
statename2.innerHTML = layer.properties.name + '<br>$' + layer.properties.total[42];
// click_inner.innerHTML = '<h4>' + layer.properties.name + '</h4>';
legendput ="Combined <span style=\"color:#ff00ff; font-size: 9px; font-weight: bold; \">▀▀▀▀▀</span>";

legend_name.innerHTML = legendput;

(function ($) {
$(document).ready(function() {

    $('#containerz').highcharts({
        chart: {
            type: 'line',
            marginRight: 10,
            marginLeft: 50,
            marginBottom: 50,
            backgroundColor: null,
            borderRadius: 0        
            },
        title: {
            floating: true,
            text: 'Per Capita Energy Expenditure in ' + layer.properties.name,
            style: {
                color: '#ffffff'
            }
        },
        subtitle: {
            text: '1970 - 2012',
            floating: true,
            style: {
                color: '#fff'
            }
        },
        xAxis: {
            categories: test1[0],
            tickInterval: 10,
            endOnTick: false,
            startOnTick: false,
            tickPosition: 'inside',
            labels: {
                style: {
                    color: '#fff'
                }
            }
        },
        yAxis: {
            endOnTick: false,
            startOnTick: false,
            min: 0,
            // max: 3050,
            // tickInterval: 500,
            title: {
                text: '',
                style: {
                    color: '#ffffff'
                }   
            },labels: {
                style: {
                    color: '#fff'                    
                },
                format: '${value}'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: ''
            }]
        },
        tooltip: {
            valueSuffix: ' dollars per person per year',
            borderRadius: 0,
            borderColor: '#444444'
        },
        legend: {
            enabled: false
        },
        series: [{
            name: layer.properties.name,
            data: layer.properties.total,
            color: '#ff00ff', 
        },
        {
            name: "Residential",
            data: layer.properties.residential,
            color: '#0000ff', 
        },
        {
            name: "Transportation",
            data: layer.properties.transportation,
            color: '#8BCC00', 
        }
        ],
        plotOptions: {
            line: {
                lineWidth: 4,
                marker: {
                    enabled: false
                },
            }
        }
    });
 });
}(jQuery));    

};