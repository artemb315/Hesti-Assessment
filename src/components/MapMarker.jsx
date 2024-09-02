import { Marker } from "@react-google-maps/api";
import MarkerIcon from "../assets/marker.svg";

const MapMarker = ({ coord }) => {
  return <Marker position={coord} icon={MarkerIcon} />;
};

export default MapMarker;
