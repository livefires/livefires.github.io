angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
	angular.extend($scope, {
        center: {
            lat: 0,
            lng: 0,
            zoom: 1
        },
        layers: {
            baselayers: {
                xyz: {
                    name: 'OpenStreetMap (XYZ)',
                    url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    type: 'xyz'
                },
            },
            overlays: {
                wms: {
                    name: 'Fires 24h',
                    type: 'wms',
                    url: 'https://firms.modaps.eosdis.nasa.gov/wms/',
                    visible: true,
                    layerParams: {
                        layers: 'fires24',
                        format: 'image/png',
                        transparent: true,
                        crs: L.CRS.EPSG4326
                    }
                }
            }
        }
    });
})
