import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useSelector, useDispatch } from "react-redux";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

import MapButton from "../components/MapButton";
import MapMarker from "../components/MapMarker";
import MapPolygon from "../components/MapPolygon";

import { setStatus } from "../store/slices/globalSlice";
import {
  setCurrentMarkerPosition,
  addMarkerPosition,
} from "../store/slices/markerSlice";
import {
  setSelectedPolygonIndex,
  setCurrentPolygon,
  addPositionToCurrent,
  addPolygon,
} from "../store/slices/polygonSlice";
import {
  NORMAL_STATUS,
  POLYGON_DRAWING_STATUS,
  MARKER_ADDING_STATUS,
} from "../constants";

const MapContainer = () => {
  const currentStatus = useSelector((state) => state.global.status);
  const currentMarker = useSelector(
    (state) => state.marker.currentMarkerPosition,
  );
  const markerPositions = useSelector((state) => state.marker.markerPositions);
  const selectedPolygonIndex = useSelector(
    (state) => state.polygon.selectedIndex,
  );
  const currentPolygon = useSelector((state) => state.polygon.currentPolygon);
  const allPolygons = useSelector((state) => state.polygon.polygons);

  const dispatch = useDispatch();

  const isNormalStatus = currentStatus === NORMAL_STATUS;

  const defaultCenter = {
    lat: 40.748817,
    lng: -73.985428,
  };

  const handleAddMarker = () => {
    dispatch(setStatus(MARKER_ADDING_STATUS));
    dispatch(setCurrentMarkerPosition({ lat: null, lng: null }));
  };

  const handleDrawPolygon = () => {
    dispatch(setStatus(POLYGON_DRAWING_STATUS));
    dispatch(setCurrentPolygon([]));
  };

  const handleCancel = () => {
    if (currentStatus === POLYGON_DRAWING_STATUS) {
      dispatch(setCurrentPolygon([]));
    } else {
      dispatch(setCurrentMarkerPosition({ lat: null, lng: null }));
    }
    dispatch(setStatus(NORMAL_STATUS));
  };

  const handleSave = () => {
    if (currentStatus === POLYGON_DRAWING_STATUS) {
      dispatch(addPolygon());
      dispatch(setStatus(NORMAL_STATUS));
    } else if (currentStatus === MARKER_ADDING_STATUS) {
      dispatch(addMarkerPosition());
      dispatch(setStatus(NORMAL_STATUS));
    }
  };

  const handleMapClick = (event) => {
    if (isNormalStatus) return;

    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    if (!isNaN(lat) && !isNaN(lng)) {
      if (currentStatus === MARKER_ADDING_STATUS) {
        dispatch(setCurrentMarkerPosition({ lat, lng }));
      } else {
        dispatch(addPositionToCurrent({ lat, lng }));
      }
    } else {
      console.warn("Invalid coordinates received from map click:", {
        lat,
        lng,
      });
    }
  };

  const handlePolygonClick = (index) => {
    if (!isNormalStatus) return;

    dispatch(setSelectedPolygonIndex(index));
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerClassName="w-full h-full"
        zoom={13}
        center={defaultCenter}
        mapTypeId="hybrid"
        onClick={handleMapClick}
      >
        <div className="flex absolute bottom-8 left-0 right-0 justify-center space-x-4">
          {isNormalStatus ? (
            <>
              <MapButton
                type="normal"
                text="Draw polygon"
                variant="solid"
                startDecorator={<BorderColorOutlinedIcon />}
                onClick={handleDrawPolygon}
              />
              <MapButton
                type="normal"
                text="Add marker"
                variant="solid"
                startDecorator={<RoomOutlinedIcon />}
                onClick={handleAddMarker}
              />
            </>
          ) : (
            <>
              <MapButton
                type="save"
                text={
                  currentStatus === POLYGON_DRAWING_STATUS
                    ? "Save polygon"
                    : "Save marker"
                }
                variant="solid"
                startDecorator={<CheckOutlinedIcon />}
                onClick={handleSave}
              />
              <MapButton
                type="cancel"
                text="Cancel"
                variant="solid"
                startDecorator={<CloseOutlinedIcon />}
                onClick={handleCancel}
              />
            </>
          )}
        </div>
        {currentStatus === MARKER_ADDING_STATUS &&
          currentMarker?.lat &&
          currentMarker?.lng && <MapMarker coord={currentMarker} />}
        {markerPositions &&
          markerPositions.length &&
          markerPositions.map((position, index) => (
            <MapMarker key={index} coord={position} />
          ))}
        {currentStatus === POLYGON_DRAWING_STATUS &&
          currentPolygon &&
          currentPolygon.length && (
            <MapPolygon type="current" coordinates={currentPolygon} />
          )}
        {allPolygons &&
          allPolygons.length &&
          allPolygons.map((polygon, index) => (
            <MapPolygon
              type={selectedPolygonIndex === index ? "selected" : "normal"}
              key={index}
              coordinates={polygon}
              onClick={() => handlePolygonClick(index)}
            />
          ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
