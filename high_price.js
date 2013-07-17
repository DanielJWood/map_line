var test1 = [[1970,1971,1972,1973,1974,1975,1976,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010],
[2.86,3.43,4.23,4.72,4.75,4.61,4.07,3.77,3.78,3.82,3.82,3.74,3.83,4.1,4.08,3.73,4.25,4.53,4.13,4.16,5.61,6.87,5.31,7.08,7.91,9.92,9.62,9.31,10.83,7.67,7.41,7.03],
[0.43,0.48,0.54,0.58,0.67,0.71,0.7,0.71,0.73,0.7,0.67,0.63,0.59,0.56,0.56,0.54,0.51,0.51,0.5,0.48,0.46,0.44,0.43,0.42,0.42,0.43,0.44,0.46,0.47,0.55,0.62,0.65],
[1.46,1.64,1.73,1.7,1.71,1.69,1.62,1.53,1.5,1.48,1.49,1.48,1.45,1.42,1.39,1.37,1.33,1.32,1.29,1.27,1.24,1.29,1.3,1.32,1.41,1.62,1.78,1.88,2.21,2.33,2.42,2.57],
[2.26,2.52,2.6,2.44,2.53,2.47,2.12,2.07,2.09,1.42,1.32,1.39,1.32,1.28,1.39,1.4,1.25,1.15,1.27,1.34,1.57,2.08,2.19,1.98,2.17,3.1,3.13,3.32,3.69,3.27,3.45,3.72]];

var items = [[1,2],[3,4],[5,6]];


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
        });
        $('#usa').click(function(e) {
            map.fitBounds([
            [42.461, -56.979],[32.536, -134.4]
            ]);
        });
    });

function onClickyhigh(e) {

        var layer = e.target;

$(function charting() {

        $('#container').highcharts({
            chart: {
                type: 'line',
                marginRight: 0,
                marginBottom: 50,
                backgroundColor: '#494947',

            },
            title: {
                text: 'Price for million BTU of coal in ' + layer.feature.properties.name,
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
                min: -0.2,
                max: 4.5,
                tickInterval: 1,
                minorTickInterval: 0.5,
                endOnTick: false,
                startOnTick: false,
                title: {
                    text: 'Price ($ per million BTU)',
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
                name: 'Coal',
                data: layer.feature.properties.datapoint,
            }],
            plotOptions: {
                line: {
                    lineWidth: 4,
                    marker: {
                        enabled: false
                    },
                    color: '#8BCC00',
                }
            }
        });
    });
};