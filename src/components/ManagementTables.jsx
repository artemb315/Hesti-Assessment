import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import ManagementTopBar from "./ManagementTopBar";
import PolygonsManagmentTable from "./PolygonsManagmentTable";
import MarkersManagmentTable from "./MarkersManagmentTable";

import { setStatus } from "../store/slices/globalSlice";
import {
  resetEditingPolygon,
  resetPolygon,
} from "../store/slices/polygonSlice";
import { resetEditingMarker, resetMarker } from "../store/slices/markerSlice";
import { NORMAL_STATUS, POLYGON_MANAGEMENT_TABLE } from "../constants";

const ManagementTables = () => {
  const [tableType, setTableType] = useState(POLYGON_MANAGEMENT_TABLE);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetEditingPolygon());
    dispatch(resetPolygon());
    dispatch(resetEditingMarker());
    dispatch(resetMarker());
    dispatch(setStatus(NORMAL_STATUS));
  }, [tableType, dispatch]);

  return (
    <div className="p-6">
      <ManagementTopBar tableType={tableType} setTableType={setTableType} />
      {tableType === POLYGON_MANAGEMENT_TABLE ? (
        <PolygonsManagmentTable />
      ) : (
        <MarkersManagmentTable />
      )}
    </div>
  );
};

export default ManagementTables;
