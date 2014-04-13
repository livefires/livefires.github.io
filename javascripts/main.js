console.log('This would be the main JS file.');
$(function(){

 	var Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
 	var currentYear=new Date().getFullYear();
 	var currentMonth=new Date().getMonth();
 	var defaultValues={min: new Date(currentYear, currentMonth, 1), max: new Date(currentYear, currentMonth+1,1)};

	var map = L.map('map', {crs: L.CRS.EPSG4326,
		minZoom:2
		// ,zoomAnimation:false
	}).setView([41.65, -0.883333], 5);
	var osm = L.tileLayer.wms("http://ows.terrestris.de/osm/service", {
		layers: 'OSM-WMS',
		format: 'image/png',
		attribution: "Hackers"
		});
	osm.addTo(map);

	var actualLayer = L.tileLayer.wms("https://firms.modaps.eosdis.nasa.gov/wms/", {
 		layers: 'fires24',
		format: 'image/png',
		attribution: "Hackers"
		});
	actualLayer.addTo(map);

	var fireLayers=L.layerGroup({});
	L.control.layers({"Actual":actualLayer,
		"Historico":fireLayers
	}).addTo(map);

	map.on('baselayerchange', function(event) {
     if(event.layer == actualLayer) {
         	$("#dateSlider").hide();
         	fireLayers.clearLayers();
	    }
    if(event.layer == fireLayers) {
         $("#dateSlider")
         .show(400,function(){
         	 $("#dateSlider").dateRangeSlider("resize");
         });
         
		bindValuesChanged(null,{values:defaultValues});
     }
	});

	 $("#dateSlider")
	 .hide()
	 .dateRangeSlider({
	 	arrows:false,
        bounds: {min: new Date(currentYear, 0, 1), max: new Date(currentYear+1, 0, 1)},
        defaultValues: defaultValues,
        range:{
    	min: {months: 1},
    	max: {months: 1}
  		},
        scales: [{
          next: function(val){
            var next = new Date(val);
            return new Date(next.setMonth(next.getMonth() + 1));
          },
          label: function(val){
            return Months[val.getMonth()];
          }
        }]
      }).bind("valuesChanged", bindValuesChanged);
	return;
	function bindValuesChanged(e, data){
		console.log("Will be executed",data);
		var minDate=data.values.min;
		var maxDate=data.values.max;
		fireLayers.clearLayers();
		//map.removeLayer(fireLayers);

		addFireLayersFromMaxMinDate(minDate,maxDate);
		//map.addLayer(fireLayers);
	 }

      function addFireLayersFromMaxMinDate(minDate,maxDate){
			currentDate=new Date(minDate);
			while(currentDate<maxDate){
				addLayer(currentDate);
				currentDate=new Date(currentDate.setDate(currentDate.getDate() + 7));
			}
      }

      function formatDate(date){
      	return date.toISOString().split("T")[0];
      }

      function addLayer(date){
		var layer = L.tileLayer.wms("https://map2a.vis.earthdata.nasa.gov/wms/wms.php", {
		time:formatDate(date),
		layers: 'MODIS_Fires_All',
		format: 'image/png',
		attribution: "Hackers"
		});
		fireLayers.addLayer(layer);
      }
});



