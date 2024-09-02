import { useState } from "react";

import ManagementTopBar from "./ManagementTopBar";
import PolygonsManagmentTable from "./PolygonsManagmentTable";
import MarkersManagmentTable from "./MarkersManagmentTable";

import { POLYGON_MANAGEMENT_TABLE } from "../constants";

const ManagementTables = () => {
  const [tableType, setTableType] = useState(POLYGON_MANAGEMENT_TABLE);

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
