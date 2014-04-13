console.log('This would be the main JS file.');
$(function(){
	var map = L.map('map', {crs: L.CRS.EPSG4326}).setView([0, 0], 1);
	var osm = L.tileLayer.wms("http://ows.terrestris.de/osm/service", {
		layers: 'OSM-WMS',
		format: 'image/png',
		attribution: "Hackers"
		});
	osm.addTo(map);
	
	var fireLayers=[];

 	var Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
 	var currentYear=new Date().getFullYear();
 	var currentMonth=new Date().getMonth();
 	var defaultValues={min: new Date(currentYear, currentMonth, 1), max: new Date(currentYear, currentMonth+1,1)};
	 $("#dateSlider").dateRangeSlider({
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
      }).bind("valuesChanged", function(e, data){
		console.log("Will be executed",data);
		var minDate=data.values.min;
		var maxDate=data.values.max;
		removeFireLayers();
		addFireLayersFromMaxMinDate(minDate,maxDate);
	 });
	addFireLayersFromMaxMinDate(defaultValues.min,defaultValues.max);
	return;

      function removeFireLayers(){
      	for (var i = fireLayers.length - 1; i >= 0; i--) {
      		 map.removeLayer(fireLayers[i]);
      	};
      	fireLayers=[];
      }

      function addFireLayersFromMaxMinDate(minDate,maxDate){
			currentDate=new Date(minDate);
			while(currentDate<maxDate){
				addLayer(currentDate);
				currentDate=new Date(currentDate.setDate(currentDate.getDate() + 1));
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
		layer.addTo(map);
		fireLayers.push(layer);
      }
});



