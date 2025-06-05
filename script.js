let map;
let userMarker;
let navigateBtn = document.getElementById("navigateBtn");
let language = 'it';

document.getElementById("languageSelect").addEventListener("change", function() {
  language = this.value;
  updateTexts();
});

function updateTexts() {
  document.getElementById("title").textContent = language === "it" ? "Dove sono oggi?" : "Where am I today?";
  navigateBtn.textContent = language === "it" ? "Naviga qui" : "Navigate here";
}

function initMap(lat, lon) {
  map = L.map("map").setView([lat, lon], 16);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  userMarker = L.marker([lat, lon]).addTo(map).bindPopup("?? Sei qui!").openPopup();

  // POI simulati
  const poi = [
    { name: "Museo", coords: [lat + 0.001, lon + 0.001] },
    { name: "Caff� storico", coords: [lat - 0.0015, lon + 0.0005] },
    { name: "Palazzo antico", coords: [lat + 0.0012, lon - 0.0008] }
  ];

  poi.forEach(p => {
    L.marker(p.coords).addTo(map).bindPopup(p.name);
  });

  navigateBtn.onclick = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`, "_blank");
  };
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      initMap(latitude, longitude);
    },
    () => {
      alert("Impossibile rilevare la posizione.");
    }
  );
} else {
  alert("Geolocalizzazione non supportata dal browser.");
}
