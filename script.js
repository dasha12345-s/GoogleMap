mapboxgl.accessToken =
  "pk.eyJ1IjoiZGFyeTE5IiwiYSI6ImNtM2Q1NWxobTAwYjcycHByZGQ1bzlwdncifQ.KfVO2G1TWM4TltESvlsjeg";

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true,
});

function successLocation(position) {
  setupMap([position.coords.longitude, position.coords.latitude]);
}

function errorLocation() {
  console.error("Unable to retrieve your location. Showing default location.");
  setupMap([-80.1918, 25.7617]); // Default: Miami
}

function setupMap(center) {
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: center,
    zoom: 14,
  });

  const nav = new mapboxgl.NavigationControl();
  map.addControl(nav);

  // Add a marker at the user's location
  new mapboxgl.Marker().setLngLat(center).addTo(map);

  // Directions plugin (optional)
  const directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: "metric",
    profile: "mapbox/driving",
  });
  map.addControl(directions, "top-left");
}
