		var d = document.getElementById("click-double-inner");
		var c = document.getElementsByClassName("legendz");
		var b = document.getElementById("statename2");
		var p = 0;

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


		//Prevent dragging and zooming
		map.dragging.disable();
		map.touchZoom.disable();

		// control that shows state info on hover
		var info = L.control();
		var info2 = L.control();



		// get color depending on population density value
		function getColor(d) {
			return d > 2000    ? '#BD0026' :
			       d > 1800    ? '#E31A1C' :
			       d > 1600    ? '#FC4E2A' :
			       d > 1300    ? '#FD8D3C' :
			       d > 1000    ? '#FEB24C' :
			       d > 800    ? '#FED976' :
			                     '#FFEDA0' ;
		}

		function style(feature) {
			return {
				weight: 1,
				opacity: 1,
				color: 'white',
				dashArray: '10,5',
				fillOpacity: 0.7,
				fillColor: getColor(feature.properties.datapoint[42])
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

			// info.update(layer.feature.properties);
		}

		var geojson;
		var activeid;
		var activedom;

		function moveState(e) {
			//this if statement resets style unless your thing is selected.
			if (e.target._leaflet_id != activeid) {

				geojson.resetStyle(e.target);

			}

			//info.update();   //Get's rid of update when leave state

		}

		function onClickfirst(geojson) {
			geojson.resetStyle();
		} 

		function onClicky(e) {
			//only add "active" after first click.
			p += 1;
			if (p == 1) {
				b.className = b.className + "  active";
				c[0].className = c[0].className + "  active";
				d.className = d.className + "  active";
			};
			


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
				weight: 7,
				opacity: 1,
				color: 'white',
				dashArray: '1,12',
				fillOpacity: '0'
			});

			//info.update(layer.feature.properties);

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

		//map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');


		var legend = L.control({position: 'bottomright'});

		legend.onAdd = function (map) {

			var div = L.DomUtil.create('div', 'info legendz'),
				grades = [800, 1100, 1300, 1600, 1800, 2000],
				labels = [],
				from, to;

			for (var i = 0; i < grades.length; i++) {
				from = grades[i];
				to = grades[i + 1];

				labels.push(
					'<i style="background:' + getColor(from + 0.1) + '"></i> $' +
					from + (to ? '&ndash; $' + to : '+'));
			}

			div.innerHTML = labels.join('<br>');
			return div;
		};

		legend.addTo(map);

