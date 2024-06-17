let map;

const CREDENTIAL_KEY = "CREDENTIAL_KEY_FROM_GOOGLE_MAPS_JAVASCRIPT_API"

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    center: { lat: -27.585006713867188, lng: -48.526302337646484 },
    zoom: 14,
    mapId: 'f5b17940ec1c83ea'
  });

  let marker = new AdvancedMarkerElement({
    map,
    position: { lat: -27.585006713867188, lng: -48.526302337646484 },
});

    window.placeMarker = placeMarker
    window.marker = marker
}

function placeMarker(location, marker) {
    marker.position = location
  }

initMap();