function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  document.addEventListener('DOMContentLoaded', function() {
    initMap();
  });

  const latitudeInput = document.getElementById('latitudeInput');
  const longitudeInput = document.getElementById('longitudeInput');
  const rssiInput = document.getElementById('rssiInput');
  const csumErrorInput = document.getElementById('csumErrorInput');

  const allowNumbersOnly = (inputElement) => {
      inputElement.addEventListener('input', function() {
          this.value = this.value.replace(/[^0-9.]/g, ''); // Allow numbers and dots
      });
  };

  allowNumbersOnly(latitudeInput);
  allowNumbersOnly(longitudeInput);
  allowNumbersOnly(rssiInput);
  allowNumbersOnly(csumErrorInput);

  const markers = [];
  
  function initMap() {
    // Initial coordinates (default map center)
    const initialCoordinates = { lat: 14.56516743474788, lng: 120.99321086784676 }; // Default is Henry Sy bldg. in DLSU
  
    // Create a new map centered at the specified coordinates
    const map = new google.maps.Map(document.getElementById('map-container'), {
      zoom: 18, // Adjust the initial zoom level as needed
      center: initialCoordinates,
    });
  
    // Define a marker variable (we'll use it to display the device location)
    let deviceMarker;
  
    // Array to store markers


    // Function to set the marker at a specific location
    function setDeviceLocation(latitude, longitude) {
        // Create a marker at the specified coordinates
        const marker = new google.maps.Marker({
            position: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
            map: map,
            title: 'Device Location',
        });

        // Center the map on the new marker's position and zoom in
        map.setCenter(marker.getPosition());
        map.setZoom(18); // Adjust the zoom level as needed

        // Add the marker to the markers array
        markers.push(marker);
    }
  
    // Add an event listener to the "Locate My Device" button
    document.getElementById('locateButton').addEventListener('click', function() {
      // Get the latitude and longitude values from the input fields
      const latitude = document.getElementById('latitudeInput').value;
      const longitude = document.getElementById('longitudeInput').value;
  
      // Check if both latitude and longitude are provided
      if (latitude && longitude) {
          // Set the device location on the map
          setDeviceLocation(latitude, longitude);
      } else {
          // Show an alert if either latitude or longitude is missing
          alert('Please enter both latitude and longitude.');
      }
  });
  }
  
  // Add an event listener to initialize the map when the page loads
  document.addEventListener('DOMContentLoaded', function() {
    initMap();
  });

  // Function to remove all markers from the map
function resetMarkers() {
  // Loop through all markers and remove them from the map
  markers.forEach(function(marker) {
      marker.setMap(null);
  });

  // Clear the markers array
  markers.length = 0;
}

// Add an event listener to the "Reset" button
document.getElementById('resetButton').addEventListener('click', function() {
  // Call the resetMarkers function to remove all markers
  resetMarkers();
});
  
