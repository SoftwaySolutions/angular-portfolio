'use strict';

/* Directives */


angular.module('myApp.directives', []).
    directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
          elm.text(version);
        };
    }]).
    directive('activeLink', function($location) {
        var link = function(scope, element, attrs) {
            scope.$watch(function() { 
                return $location.path(); 
            },
            function(path) {
                var url = element.find('a').attr('href');
                if (url) {
                    url = url.substring(1);
                }
     
                if (path == url) {
                    element.addClass("active");
                } else {
                    element.removeClass('active');
                }
     
            });
        };
     
        return {
            restrict: 'A',
            link: link
        };
    }).
    directive('map', function() {
        return {
            restrict: 'E',
            replace: true,
            template: '<div></div>',
            link: function(scope, element, attrs) {
                var MY_MAPTYPE_ID = 'custom_style';
                var featureOpts = [
                    {
                    featureType: "all",
                        stylers: [
                          { saturation: -100 }
                        ]
                    },{
                        featureType: "road.arterial",
                        elementType: "geometry",
                        stylers: [
                          
                        ]
                    },{
                        featureType: "poi.business",
                        elementType: "labels",
                        stylers: [
                          { visibility: "on" }
                        ]
                    }
                ];

                // var point = new google.maps.LatLng(-37.8602828, 145.079616);
                var point = new google.maps.LatLng(-37.901198, 145.040644);

                var mapOptions = {
                    zoom: 10,
                    center: point,
                    mapTypeId: MY_MAPTYPE_ID,
                    mapTypeControlOptions: {
                      mapTypeIds: [MY_MAPTYPE_ID]
                    },
                    panControl: false,
                    zoomControlOptions: {
                        style: google.maps.ZoomControlStyle.SMALL
                    },
                    scaleControl: true,
                    scrollwheel: false,
                    streetViewControl: false
                };
                
                var map = new google.maps.Map(document.getElementById(attrs.id), mapOptions);
                var styledMapOptions = {
                    name: 'Map'
                };

                var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);
                map.mapTypes.set(MY_MAPTYPE_ID, customMapType);

                var marker = new google.maps.Marker({
                    position: point,
                    map: map,
                    icon: {
                        url:'img/marker.svg',
                        size: new google.maps.Size(48, 48),
                          origin: null,
                          anchor: null,
                          scaledSize: new google.maps.Size(48, 48)
                    },
                    title:"Xiaotian Tan"
                });
                google.maps.event.addListener(window, 'resize', function() {
                    map.setCenter(point);
                });
                
                google.maps.event.addListener(window, 'resize', function() {
                    map.setCenter(point);
                });
                
                // google.maps.event.addListener(marker, 'click', toggleBounce);
                
                google.maps.event.addListener(map, 'zoom_changed', function() {
                    var zoomLevel = map.getZoom();
                    if (zoomLevel > 11){
                        map.setZoom(11);
                    }
                    map.setCenter(point);
                    //infowindow.setContent('Zoom: ' + zoomLevel);
                });

            
        }
    };
});