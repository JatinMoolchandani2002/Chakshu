import L from "leaflet";
import redpin from '../assets/redpin.png'
import yellowpin from '../assets/yellowpin.png'

export default L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});

export const redpinicon = new L.icon({
    iconUrl: redpin,
    iconSize: [50, 50],
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
  });

export const yellowpinicon = new L.icon({
    iconUrl: yellowpin,
    iconSize: [50, 50],
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
  });
