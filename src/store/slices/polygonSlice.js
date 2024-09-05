import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedId: -1,
  editingId: -1,
  currentPolygon: {},
  polygons: [],
  no: 1,
};

export const polygonSlice = createSlice({
  name: "polygon",
  initialState,
  reducers: {
    newCurrentPolygon: (state) => {
      state.currentPolygon = {
        id: state.no,
        name: `Polygon ${state.no}`,
        positions: [],
      };
    },
    setSelectedPolygonId: (state, action) => {
      state.selectedId = action.payload;
    },
    setEditingId: (state, action) => {
      state.editingId = action.payload;
    },
    setCurrentPolygonName: (state, action) => {
      state.currentPolygon.name = action.payload;
    },
    setEditingPolygonName: (state, action) => {
      const editingPolygon = state.polygons.find(
        (polygon) => polygon.id === state.editingId,
      );
      editingPolygon.name = action.payload;
    },
    addPositiontoCurrentPolygon: (state, action) => {
      state.currentPolygon.positions = [
        ...state.currentPolygon.positions,
        action.payload,
      ];
    },
    addPositiontoEditingPolygon: (state, action) => {
      const editingPolygon = state.polygons.find(
        (polygon) => polygon.id === state.editingId,
      );
      editingPolygon.positions = [...editingPolygon.positions, action.payload];
    },
    setCurrentPolygonPositions: (state, action) => {
      state.currentPolygon.positions = action.payload;
    },
    setEditingPolygonPositions: (state, action) => {
      const editingPolygon = state.polygons.find(
        (polygon) => polygon.id === state.editingId,
      );
      editingPolygon.positions = action.payload;
    },
    resetPolygon: (state) => {
      state.currentPolygon = {};
      state.selectedId = -1;
      state.editingId = -1;
    },
    addPolygon: (state) => {
      if (state.currentPolygon.positions?.length) {
        state.polygons = [...state.polygons, state.currentPolygon];
        state.no += 1;
      }
    },
    removePolygon: (state, action) => {
      state.polygons = state.polygons.filter(
        (polygon) => polygon.id !== action.payload,
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  newCurrentPolygon,
  setSelectedPolygonId,
  setEditingId,
  setCurrentPolygonName,
  setEditingPolygonName,
  addPositiontoCurrentPolygon,
  addPositiontoEditingPolygon,
  setCurrentPolygonPositions,
  setEditingPolygonPositions,
  resetPolygon,
  addPolygon,
  removePolygon,
} = polygonSlice.actions;

export default polygonSlice.reducer;
