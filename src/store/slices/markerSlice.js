import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedId: -1,
  editingId: -1,
  originalMarker: {},
  currentMarker: {},
  markers: [],
  no: 1,
};

export const markerSlice = createSlice({
  name: "marker",
  initialState,
  reducers: {
    newCurrentMarker: (state) => {
      state.currentMarker = {
        id: state.no,
        name: `Marker ${state.no}`,
        position: { lat: 0, lng: 0 },
      };
    },
    setSelectedMarkerId: (state, action) => {
      state.selectedId = action.payload;
    },
    setEditingId: (state, action) => {
      state.editingId = action.payload;
    },
    setCurrentMarkerName: (state, action) => {
      state.currentMarker.name = action.payload;
    },
    setEditingMarkerName: (state, action) => {
      const editingMarker = state.markers.find(
        (marker) => marker.id === state.editingId,
      );
      editingMarker.name = action.payload;
    },
    setCurrentMarkerPosition: (state, action) => {
      state.currentMarker.position = action.payload;
    },
    setEditingMarkerPosition: (state, action) => {
      const editingMarker = state.markers.find(
        (marker) => marker.id === state.editingId,
      );
      editingMarker.position = action.payload;
    },
    saveOriginalMarker: (state) => {
      const editingMarker = state.markers.find(
        (marker) => marker.id === state.editingId,
      );
      state.originalMarker = { ...editingMarker };
    },
    resetEditingMarker: (state) => {
      state.markers = state.markers.map((marker) =>
        marker.id === state.originalMarker.id
          ? state.originalMarker
          : marker,
      );
    },
    resetMarker: (state) => {
      state.currentMarker = {};
      state.selectedId = -1;
      state.editingId = -1;
    },
    addMarker: (state) => {
      if (
        state.currentMarker.position.lat &&
        state.currentMarker.position.lng
      ) {
        state.markers = [...state.markers, state.currentMarker];
        state.no += 1;
      }
    },
    removeMarker: (state, action) => {
      state.markers = state.markers.filter(
        (marker) => marker.id !== action.payload,
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  newCurrentMarker,
  setSelectedMarkerId,
  setEditingId,
  setCurrentMarkerName,
  setEditingMarkerName,
  setCurrentMarkerPosition,
  setEditingMarkerPosition,
  saveOriginalMarker,
  resetEditingMarker,
  resetMarker,
  addMarker,
  removeMarker,
} = markerSlice.actions;

export default markerSlice.reducer;
