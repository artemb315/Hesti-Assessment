import { Marker } from "@react-google-maps/api";
import MarkerIcon from "../assets/marker.svg";
// import PencilIcon from "../assets/pencil.svg";
import { MARKER_ADDING_STATUS } from "../constants";

const MapMarker = ({ coord, type }) => {
  return (
    <Marker
      position={coord}
      icon={type === MARKER_ADDING_STATUS ? MarkerIcon : null}
    />
  );
};

export default MapMarker;
