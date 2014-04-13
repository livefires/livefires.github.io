console.log('This would be the main JS file.');
<<<<<<< HEAD
=======
$(function(){
	var map = L.map('map', {crs: L.CRS.EPSG4326}).setView([0, 0], 1);
	var osm = L.tileLayer.wms("http://ows.terrestris.de/osm/service", {
		layers: 'OSM-WMS',
		format: 'image/png',
		attribution: "Hackers"
		});
	osm.addTo(map);

	var nexrad = L.tileLayer.wms("https://firms.modaps.eosdis.nasa.gov/wms/", {
		layers: 'fires24',
		format: 'image/png',
		attribution: "Hackers"
	});
  	nexrad.addTo(map);


});
>>>>>>> b4ec59a1b8ac61cc290b5fe54512893175e12397
