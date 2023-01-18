import L from "leaflet"
import icon from './images/icon-location.svg'

export default L.icon({
    iconSize: [20,30],
    iconAnchor: [10,41],
    popupAnchor: [2,-40],
    iconUrl: icon,
})