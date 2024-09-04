import { useRef } from "react";
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
  newCurrentMarker,
  setCurrentMarkerPosition,
  resetCurrentMarker,
  addMarker,
} from "../store/slices/markerSlice";
import {
  newCurrentPolygon,
  setSelectedPolygonId,
  addPositiontoCurrentPolygon,
  resetCurrentPolygon,
  addPolygon,
} from "../store/slices/polygonSlice";
import {
  NORMAL_STATUS,
  POLYGON_DRAWING_STATUS,
  MARKER_ADDING_STATUS,
  MARKER_EDITING_STATUS,
} from "../constants";

const MapContainer = () => {
  const currentStatus = useSelector((state) => state.global.status);

  const currentMarker = useSelector((state) => state.marker.currentMarker);
  const allMarkers = useSelector((state) => state.marker.markers);

  const selectedPolygonId = useSelector((state) => state.polygon.selectedId);
  const currentPolygon = useSelector((state) => state.polygon.currentPolygon);
  const allPolygons = useSelector((state) => state.polygon.polygons);

  const dispatch = useDispatch();

  const isNormalStatus = currentStatus === NORMAL_STATUS;

  const initialCenter = useRef({
    lat: 40.748817,
    lng: -73.985428,
  }).current;

  const handleAddMarker = () => {
    dispatch(setStatus(MARKER_ADDING_STATUS));
    dispatch(newCurrentMarker());
  };

  const handleDrawPolygon = () => {
    dispatch(setStatus(POLYGON_DRAWING_STATUS));
    dispatch(newCurrentPolygon());
  };

  const handleCancel = () => {
    if (currentStatus === POLYGON_DRAWING_STATUS) {
      dispatch(resetCurrentPolygon());
    } else {
      dispatch(resetCurrentMarker());
    }
    dispatch(setStatus(NORMAL_STATUS));
  };

  const handleSave = () => {
    if (currentStatus === POLYGON_DRAWING_STATUS) {
      dispatch(addPolygon());
      dispatch(resetCurrentPolygon());
      dispatch(setStatus(NORMAL_STATUS));
    } else if (currentStatus === MARKER_ADDING_STATUS) {
      dispatch(addMarker());
      dispatch(resetCurrentMarker());
      dispatch(setStatus(NORMAL_STATUS));
    }
  };

  const handleMapClick = (event) => {
    if (isNormalStatus) return;

    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    if (!isNaN(lat) && !isNaN(lng)) {
      if (
        currentStatus === MARKER_ADDING_STATUS ||
        currentStatus === MARKER_EDITING_STATUS
      ) {
        dispatch(setCurrentMarkerPosition({ lat, lng }));
      } else {
        dispatch(addPositiontoCurrentPolygon({ lat, lng }));
      }
    } else {
      console.warn("Invalid coordinates received from map click:", {
        lat,
        lng,
      });
    }
  };

  const handlePolygonClick = (id) => {
    if (!isNormalStatus) return;

    dispatch(setSelectedPolygonId(id));
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerClassName="w-full h-full"
        zoom={13}
        center={initialCenter}
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
          currentMarker.position?.lat &&
          currentMarker.position?.lng && (
            <MapMarker
              coord={currentMarker.position}
              type={MARKER_ADDING_STATUS}
            />
          )}
        {allMarkers &&
          allMarkers.length &&
          allMarkers.map((marker) => (
            <MapMarker
              key={marker.id}
              coord={marker.position}
              type={MARKER_ADDING_STATUS}
            />
          ))}
        {currentStatus === POLYGON_DRAWING_STATUS &&
          currentPolygon &&
          currentPolygon.positions?.length && (
            <>
              <MapPolygon
                type="current"
                coordinates={currentPolygon.positions}
              />
              <MapMarker
                coord={
                  currentPolygon.positions[currentPolygon.positions.length - 1]
                }
                type={POLYGON_DRAWING_STATUS}
              />
            </>
          )}
        {allPolygons?.length > 0 &&
          allPolygons.map((polygon) => (
            <MapPolygon
              type={selectedPolygonId === polygon.id ? "selected" : "normal"}
              key={polygon.id}
              coordinates={polygon.positions}
              onClick={() => handlePolygonClick(polygon.id)}
            />
          ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
