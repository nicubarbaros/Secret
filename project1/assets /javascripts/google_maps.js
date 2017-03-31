var InfoBoxBuilder, handler,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

InfoBoxBuilder = (function(superClass) {
  extend(InfoBoxBuilder, superClass);

  function InfoBoxBuilder() {
    return InfoBoxBuilder.__super__.constructor.apply(this, arguments);
  }

  InfoBoxBuilder.prototype.create_infowindow = function() {
    var boxText;
    if (!_.isString(this.args.infowindow)) {
      return null;
    }
    boxText = document.createElement("div");
    boxText.setAttribute('class', 'info--window-wrapper');
    boxText.innerHTML = this.args.infowindow;
    return this.infowindow = new InfoBox(this.infobox(boxText));
  };

  InfoBoxBuilder.prototype.infobox = function(boxText) {
    return {
      content: boxText,
      pixelOffset: new google.maps.Size(-140, 0),
      boxStyle: {
        width: "400px"
      }
    };
  };

  return InfoBoxBuilder;

})(Gmaps.Google.Builders.Marker);


function get_handler() {
    return Gmaps.build('Google', { builders: {Marker: InfoBoxBuilder}});
}


var mapStyle = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#343434"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#ef5350"},{"visibility":"on"}]}]


function update_contacts_on_map(company) {
    if ((company.lat == null) || (company.long == null)) {    // validation check if coordinates are there
        return 0;
    }

    handler = get_handler();
    handler.buildMap({provider: {}, internal: {id: 'map'}}, function () {
        markers = add_marker(handler, company.lat, company.long);
        google.maps.event.addListener(handler.getMap(), 'click', function (event) {
            send_coords('coordinates/new', event.latLng.lat(), event.latLng.lng());
            handler.removeMarkers(markers);
            new_markers = add_marker(handler, event.latLng.lat(), event.latLng.lng());
        });
        handler.bounds.extendWith(markers);
        handler.fitMapToBounds();
        handler.getMap().setZoom(6);    // set the default zoom of the map
    });
}



function show_lbgs(lbgs) {
    lbgs[0].picture = {url: "http://i.imgur.com/p65F9dz.png",
                width: 36,
                height: 36 }

    custom_marker(lbgs);
    lbgs_nr = lbgs.length;
    if (lbgs_nr > 0) {
        handler = get_handler();
        handler.buildMap({provider: {styles: mapStyle}, internal: {id: 'map'}}, function () {
            markers = handler.addMarkers(lbgs);
            handler.bounds.extendWith(markers);
            handler.fitMapToBounds();
            if (lbgs_nr == 1) {
                handler.getMap().setOptions({ 
                    zoom: 15,
                    scrollwheel: false,
                });
            }

            else {
                handler.getMap().setOptions({ 
                    zoom: 4,
                    scrollwheel: false,
                });
            }
        });
    }
}

function pin_lbg_on_map(lbg) {
    handler = get_handler();
    handler.buildMap({provider: {}, internal: {id: 'map'}}, function () {
        markers = add_marker(handler, lbg.lat, lbg.long);
        google.maps.event.addListener(handler.getMap(), 'click', function (event) {
            set_location(event.latLng.lat(), event.latLng.lng());
            handler.removeMarkers(markers);
            new_markers = add_marker(handler, event.latLng.lat(), event.latLng.lng());
        });
        handler.bounds.extendWith(markers);
        handler.fitMapToBounds();
        handler.getMap().setZoom(6);    // set the default zoom of the map
    });
}

function set_location(lat, long) {
    $('#local_group_lat').val(lat);
    $('#local_group_long').val(long);
}


function add_marker(handler, lat, long) {
    markers = handler.addMarkers([    // put marker method
        {
            lat: lat,    // coordinates from parameter company
            lng: long,
            picture: {    // setup marker icon
                url: "http://i.imgur.com/p65F9dz.png",
                width: 36,
                height: 36
            }
        }
    ]);
    return markers;
}

function send_coords(url, lat, long) {
    $.ajax({
        url: url,
        type: 'post',
        data: {lat: lat, long: long}
    });
}

function custom_marker(lbgs) {
    lbgs.forEach( function (arrayItem)
    {
        arrayItem.picture = {url: "http://i.imgur.com/CpdCdB8.png",
                width: 70,
                height: 70, }
    });
}
