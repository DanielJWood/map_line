var test1 = [[1970,1971,1972,1973,1974,1975,1976,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010]];

var items = [[1,2],[3,4],[5,6]];

$( document ).ready(function() {
console.log(statesData.features[51].properties)

onClickyhigh();

});

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
            onClickyhigh();
            selectstate();
        });
    });

function selectstate() {
            if (activedom != undefined) {
                activedom.setStyle({
                    weight: 1,
                    dashArray: '3',
                    fillOpacity: '0.7'
                });
            }; 
}

function onClickyhigh(e) {

if (e != null) {
    var layer = e.target.feature;
}
else {
    var layer = statesData.features[51];
};


    $('#container').highcharts({
        chart: {
            type: 'line',
            marginRight: 0,
            marginBottom: 50,
            backgroundColor: '#494947',

        },
        title: {
            text: 'Price for million BTU of coal in ' + layer.properties.name,
            x: -20, //center
            style: {
                color: '#ffffff'
            }
        },

        xAxis: {
            categories: test1[0],
            tickInterval: 10,
            endOnTick: false,
            startOnTick: false,
            title: {
                text: 'Year',
                style: {
                    color: '#ffffff'
                }   
            },
        },
        yAxis: {
            endOnTick: false,
            startOnTick: false,
            title: {
                text: '',
                style: {
                    color: '#ffffff'
                }   
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: ''
            }]
        },
        tooltip: {
            valueSuffix: ' dollars per million BTU'
        },
        legend: {
            enabled: false,
        },
        series: [{
            name: layer.properties.name,
            data: layer.properties.datapoint,
            color: '#8BCC00', 
        },
        {
            name: 'US Total',
            data: statesData.features[51].properties.datapoint,
            color: '#ff00ff',
        }],
        plotOptions: {
            line: {
                lineWidth: 4,
                marker: {
                    enabled: false
                },
            }
        }
    });
};