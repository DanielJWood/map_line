

		var map = L.map('map', {
			scrollWheelZoom: false
		}).fitBounds([
            [42.461, -56.979],[32.536, -134.4]
            ]);

		var cloudmade = L.tileLayer("http://a.tiles.mapbox.com/v3/energy.map-iaegae49/{z}/{x}/{y}.png", {
			//attribution: 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade',
			//key: 'BC9A493B41014CAABB98F0471D759707',
			//styleId: 22677
		}).addTo(map);


		// control that shows state info on hover
		var info = L.control();

		info.onAdd = function (map) {
			this._div = L.DomUtil.create('div', 'info');
			this.update();
			return this._div;
		};

		info.update = function (props) {
			this._div.innerHTML = '<h4>Energy Expenditure per person</h4>' +  (props ?
				'<b>' + props.name + '</b><br />$' + props.datapoint[40] + ' per person'
				: 'Click on a state');
		};

		info.addTo(map);


		// get color depending on population density value
		function getColor(d) {
			return d > 6000    ? '#800026' :
			       d > 5000    ? '#BD0026' :
			       d > 4500    ? '#E31A1C' :
			       d > 4000    ? '#FC4E2A' :
			       d > 3500    ? '#FD8D3C' :
			       d > 3000    ? '#FEB24C' :
			       d > 2000    ? '#FED976' :
			                  '#FFEDA0' ;
		}

		function style(feature) {
			return {
				weight: 1,
				opacity: 1,
				color: 'white',
				dashArray: '10,5',
				fillOpacity: 0.7,
				fillColor: getColor(feature.properties.datapoint[40])
			};
		}

		function highlightFeature(e) {
			var layer = e.target;
			
			//If you scroll over active layer, don't highlight
			if (layer != activedom) {
				layer.setStyle({				
					fillOpacity: 0.37
				});
			};

			if (!L.Browser.ie && !L.Browser.opera) {
				layer.bringToFront();
			}

			//info.update(layer.feature.properties);
		}

		var geojson;
		var activeid;
		var activedom;

		function moveState(e) {
			//this if statement resets style unless your thing is selected.
			if (e.target._leaflet_id != activeid) {

				geojson.resetStyle(e.target);

			}
			//console.log(e.target._leaflet_id)

			//console.log(activeid);

			//info.update();   //Get's rid of update when leave state

		}

		function onClickfirst(geojson) {
			geojson.resetStyle();
		} 

		function onClicky(e) {

			//this clears the current highlighting on click, if there is something already highlighted.
			if (activedom != undefined) {
				activedom.setStyle({
					weight: 1,
					dashArray: '3',
					fillOpacity: '0.7'
				});
			}; 

			var layer = e.target;
			
			activeid = layer._leaflet_id;
			
			//define next active dom to carry through to next loop
			activedom = layer;

			layer.setStyle({
				weight: 10,
				opacity: 1,
				color: 'white',
				dashArray: '1,17',
				fillOpacity: '0'
			});

			info.update(layer.feature.properties);

			map.fitBounds(e.target.getBounds());

		}

		function onEachFeature(feature, layer) {
			layer.on({
				click: onClicky

			});
			

			layer.on({
				mouseover: highlightFeature,
				mouseout: moveState,
				click: onClickyhigh
			});
		}

		geojson = L.geoJson(statesData, {
			style: style,
			onEachFeature: onEachFeature
		}).addTo(map);

		map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');


		var legend = L.control({position: 'bottomright'});

		legend.onAdd = function (map) {

			var div = L.DomUtil.create('div', 'info legend'),
				grades = [2000, 3000, 3500, 4000, 4500, 5000, 6000],
				labels = [],
				from, to;

			for (var i = 0; i < grades.length; i++) {
				from = grades[i];
				to = grades[i + 1];

				labels.push(
					'<i style="background:' + getColor(from + 0.1) + '"></i> ' +
					from + (to ? '&ndash;' + to : '+'));
			}

			div.innerHTML = labels.join('<br>');
			return div;
		};

		legend.addTo(map);

