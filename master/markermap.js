//assign urls to variables
var missingperson_data = "missingperson.geojson"
async function getData() {
  let data = await d3.json(missingperson_data);
  return data;
}
mapboxgl.accessToken = "pk.eyJ1IjoiY2hhcmxlc2Vicmlua2xleSIsImEiOiJjazdheW4waHgxOTUxM2Zxa2NqY2VpMXA4In0.hJ8wu5RhmkCrfkjo9BUSzg";

main();
async function main() {
  let data = await getData();
  console.log(data)
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-96, 40],
    zoom: 3
  });

  var popup = new mapboxgl.Popup({
    closeButton: false,
  });

  map.on('load', function () {
    map.addSource('points', {
      'type': 'geojson',
      'data': data
    });
    map.addLayer({
      'id': 'points',
      'type': 'symbol',
      'source': 'points',
      'layout': {
        'icon-image': 'marker-15',
      }
    });

    map.addLayer({
      id: 'unclustered-point',
      type: 'circle',
      source: 'points',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': '#11b4da',
        'circle-radius': 2,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#fff'
      }
    });

    map.on('mousemove', 'points', function (e) {
      // Change the cursor style as a UI indicator.
      map.getCanvas().style.cursor = 'pointer';
      var feature = e.features[0];
      ;

      // Display a popup showing missing person details

      popup.setLngLat(e.lngLat)
        .setHTML(
          '<b>' + feature.properties.first + " " + feature.properties.last +
          '</b><li>' + "<b>Age: </b>" + feature.properties.age +
          '</li><li>' + "<b>Race: </b>" + feature.properties.race +
          '</li><li>' + "<b>Date Last Seen: </b>" + feature.properties.date_last_seen +
          '</li><li>' + "<b>City Last Seen: </b>" + feature.properties.city_last_seen + ", " + feature.properties.state_last_seen +
          '</li></body>')
        .addTo(map);
    });

    map.on('mouseleave', 'points', function () {
      map.getCanvas().style.cursor = '';
      popup.remove();
    });
  });
}