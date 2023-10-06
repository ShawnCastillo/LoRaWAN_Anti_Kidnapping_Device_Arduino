$(document).ready(function() {
  // Function to open the side navigation
  function openNav() {
      $("#mySidenav").css("width", "250px");
  }

  // Function to close the side navigation
  function closeNav() {
      $("#mySidenav").css("width", "0");
  }

  // Initialize Google Maps on document ready
  function initMap() {
      const initialCoordinates = { lat: 14.56516743474788, lng: 120.99321086784676 };
      const map = new google.maps.Map($("#map-container")[0], {
          zoom: 18,
          center: initialCoordinates
      });

      let deviceMarker;
      const markers = [];

      function setDeviceLocation(latitude, longitude) {
          const labelText = `Lat: ${parseFloat(latitude).toFixed(5)}, Lng: ${parseFloat(longitude).toFixed(5)}`;
          const marker = new google.maps.Marker({
              position: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
              map: map,
              title: labelText
          });

          map.setCenter(marker.getPosition());
          map.setZoom(18);
          markers.push(marker);
      }

      $("#locateButton").click(function() {
          const latitude = $("#latitudeInput").val();
          const longitude = $("#longitudeInput").val();

          if (latitude && longitude) {
              setDeviceLocation(latitude, longitude);
          } else {
              alert('Please enter both latitude and longitude.');
          }
      });

      $("#resetButton").click(function() {
          markers.forEach(function(marker) {
              marker.setMap(null);
          });

          markers.length = 0;
      });
  }

  initMap();

  // Allow numbers and dots only in input fields
  function allowNumbersOnly(inputElement) {
      inputElement.on('input', function() {
          this.value = this.value.replace(/[^0-9.]/g, '');
      });
  }

  allowNumbersOnly($("#latitudeInput"));
  allowNumbersOnly($("#longitudeInput"));
  allowNumbersOnly($("#rssiInput"));
  allowNumbersOnly($("#csumErrorInput"));
});
