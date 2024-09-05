import { AdvancedMarker } from "@vis.gl/react-google-maps";
import MarkerIcon from "../assets/marker.png";
import PencilIcon from "../assets/pencil.png";
import { MARKER_ADDING_STATUS } from "../constants";

const MapMarker = ({ coord, type }) => {
  return (
    <AdvancedMarker position={coord}>
      {type === MARKER_ADDING_STATUS ? (
        <img src={MarkerIcon} width={24} height={24} />
      ) : (
        <img src={PencilIcon} width={48} height={24} />
      )}
    </AdvancedMarker>
  );
};

export default MapMarker;
