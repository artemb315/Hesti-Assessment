import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/joy";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import ManagementTab from "./ManagementTab";

import { setStatus } from "../store/slices/globalSlice";
import { newCurrentMarker } from "../store/slices/markerSlice";
import { newCurrentPolygon } from "../store/slices/polygonSlice";
import {
  POLYGON_MANAGEMENT_TABLE,
  MARKER_MANAGEMENT_TABLE,
} from "../constants";
import { POLYGON_DRAWING_STATUS, MARKER_ADDING_STATUS } from "../constants";

const ManagementTopBar = ({ tableType, setTableType }) => {
  const allMarkers = useSelector((state) => state.marker.markerPositions) || [];
  const allPolygons = useSelector((state) => state.polygon.polygons) || [];

  const dispatch = useDispatch();

  const isPolygonTable = tableType === POLYGON_MANAGEMENT_TABLE;
  const currentCount = isPolygonTable ? allPolygons.length : allMarkers.length;

  const tabTexts = ["Polygon management", "Marker management"];

  const handleAdd = () => {
    if (isPolygonTable) {
      dispatch(setStatus(POLYGON_DRAWING_STATUS));
      dispatch(newCurrentPolygon());
    } else {
      dispatch(setStatus(MARKER_ADDING_STATUS));
      dispatch(newCurrentMarker());
    }
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex gap-4">
        {[POLYGON_MANAGEMENT_TABLE, MARKER_MANAGEMENT_TABLE].map(
          (item, index) => (
            <ManagementTab
              key={index}
              text={tabTexts[index]}
              id={item}
              tableType={tableType}
              setTableType={setTableType}
            />
          ),
        )}
      </div>
      <div className="flex gap-4">
        {!currentCount ? (
          <Button
            disabled
            variant="solid"
            startDecorator={<FileDownloadOutlinedIcon />}
          >
            Download
          </Button>
        ) : (
          <Button
            variant="plain"
            startDecorator={<FileDownloadOutlinedIcon />}
            sx={{
              color: "#3E4970",
              "&:hover": {
                color: "#4F5A85",
              },
            }}
          >
            Download
          </Button>
        )}
        <Button
          variant="outlined"
          startDecorator={<AddOutlinedIcon />}
          sx={{
            color: "#57167E",
            borderColor: "#57167E",
            "&:hover": {
              backgroundColor: "rgba(87, 22, 126, 0.2)",
            },
          }}
          onClick={handleAdd}
        >
          Add {isPolygonTable ? "polygon" : "marker"}
        </Button>
      </div>
    </div>
  );
};

export default ManagementTopBar;
