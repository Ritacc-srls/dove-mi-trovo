let map;
let service;
let userLocation;

function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        map = new google.maps.Map(document.getElementById("map"), {
          center: userLocation,
          zoom: 15,
        });
        new google.maps.Marker({
          position: userLocation,
          map: map,
          title: "Sei qui",
        });
      },
      () => alert("Errore: impossibile ottenere la posizione.")
    );
  } else {
    alert("Geolocalizzazione non supportata dal tuo browser.");
  }
}

document.getElementById("findPlaces").addEventListener("click", () => {
  if (!map || !userLocation) {
    alert("Posizione non ancora caricata.");
    return;
  }

  let request = {
    location: userLocation,
    radius: '1000',
    type: ['tourist_attraction', 'museum', 'point_of_interest']
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        new google.maps.Marker({
          position: results[i].geometry.location,
          map: map,
          title: results[i].name,
          icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          }
        });
      }
    } else {
      alert("Nessun luogo trovato nelle vicinanze.");
    }
  });
});
