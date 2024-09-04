import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedId: -1,
  currentPolygon: {},
  polygons: [],
  no: 1,
};

export const polygonSlice = createSlice({
  name: "polygon",
  initialState,
  reducers: {
    setSelectedPolygonId: (state, action) => {
      state.selectedId = action.payload;
    },
    setCurrentPolygon: (state, action) => {
      state.currentPolygon = {
        id: state.no,
        name: `Polygon ${state.no}`,
        positions: action.payload,
      };
      state.no += 1;
    },
    addPositionToCurrent: (state, action) => {
      state.currentPolygon = {
        ...state.currentPolygon,
        positions: [...state.currentPolygon.positions, action.payload],
      };
    },
    addPolygon: (state) => {
      state.polygons = [...state.polygons, state.currentPolygon];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSelectedPolygonId,
  setCurrentPolygon,
  addPositionToCurrent,
  addPolygon,
} = polygonSlice.actions;

export default polygonSlice.reducer;
