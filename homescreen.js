document.addEventListener('DOMContentLoaded', function() {
    initMap();
  });
  
  const latitudeInput = document.getElementById('latitudeInput');
  const longitudeInput = document.getElementById('longitudeInput');
  
    // Define the Google Maps map and markers variables here for global access
let map;
let deviceMarker;

const Sensor1GetRequestFromTagIO = () => {
  const url = 'https://api.tago.io/data?variable=message';
  const deviceToken = 'b5a683dc-6710-42d8-b070-9a6d462ae61d'; 

  const headers = new Headers({
    'Authorization': deviceToken
  });

  const requestOptions = {
    method: 'GET',
    headers: headers
  };

  return fetch(url, requestOptions)
    .then(response => response.json())
    .then(json => {
      const locationData = json.result.find(item => item.variable === 'message');
      if (locationData && locationData.value) {
        const coordinates = locationData.value.split('|').map(coord => parseFloat(coord.trim()));
        const [latitude, longitude] = coordinates;

        // Set the latitude and longitude values to the input fields
        const latitudeInput = document.getElementById('latitudeInput');
        const longitudeInput = document.getElementById('longitudeInput');
        latitudeInput.value = latitude;
        longitudeInput.value = longitude;

        // Call the setDeviceLocation function to update the map
        setDeviceLocation(latitude, longitude);
      }

      return null;
    })
    .catch(error => {
      console.error("Node 1 has an error: " + error);
    });
};

const interval = 5000; // 5 seconds in milliseconds


// Execute the fetchDataPeriodically function initially when the page loads
document.addEventListener('DOMContentLoaded', Sensor1GetRequestFromTagIO);

// Set an interval to execute the function every 20 seconds
setInterval(Sensor1GetRequestFromTagIO, interval);

// Initialize the map
function initMap() {
  const initialCoordinates = { lat: 14.56516743474788, lng: 120.99321086784676 };
  map = new google.maps.Map(document.getElementById('map-container'), {
    zoom: 18,
    center: initialCoordinates,
  });
}

// Function to set the marker at a specific location
function setDeviceLocation(latitude, longitude) {
  // Create a formatted label text with 5 decimal points
  const labelText = `Lat: ${parseFloat(latitude).toFixed(5)}, Lng: ${parseFloat(longitude).toFixed(5)}`;

  // Remove the previous marker, if it exists
  if (deviceMarker) {
    deviceMarker.setMap(null);
  }

  // Create a new marker at the specified coordinates with the label
  deviceMarker = new google.maps.Marker({
    position: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
    map: map,
    title: labelText,
  });

  // Center the map on the new marker's position
  map.setCenter(deviceMarker.getPosition());
}

  