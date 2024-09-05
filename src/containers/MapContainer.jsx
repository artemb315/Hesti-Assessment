import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useSelector, useDispatch } from "react-redux";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

import { MapPolygon } from "../components/MapPolygon";
import MapButton from "../components/MapButton";
import MapMarker from "../components/MapMarker";

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
  const initialCenter = {
    lat: 40.748817,
    lng: -73.985428,
  };
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
    const lat = event.detail.latLng.lat;
    const lng = event.detail.latLng.lng;
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
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Map
        mapContainerClassName="w-full h-full"
        defaultZoom={12}
        defaultCenter={initialCenter}
        mapTypeId="hybrid"
        onClick={handleMapClick}
        mapId="polygon-marker-map"
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
                paths={currentPolygon.positions}
                strokeColor="#D898FF"
                strokeOpacity={1}
                strokeWeight={4}
                fillColor="#D898FF"
                fillOpacity={0.2}
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
          allPolygons.map((polygon) => {
            const isSelected = selectedPolygonId === polygon.id;
            return (
              <MapPolygon
                key={polygon.id}
                paths={polygon.positions}
                strokeColor={isSelected ? "#FFFFFF" : "#D898FF"}
                strokeOpacity={1}
                strokeWeight={4}
                fillColor={isSelected ? "#D898FF" : "transparent"}
                fillOpacity={isSelected ? 1 : 0}
                onClick={() => handlePolygonClick(polygon.id)}
              />
            );
          })}
      </Map>
    </APIProvider>
  );
};

export default MapContainer;
