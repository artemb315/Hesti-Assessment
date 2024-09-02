import { useState } from "react";
import { Tabs, TabList, Tab, tabClasses, TabPanel } from "@mui/joy";

import PolygonsManagmentTable from "./PolygonsManagmentTable";
import MarkersManagmentTable from "./MarkersManagmentTable";

const ManagementTables = () => {
  const [index, setIndex] = useState(0);
  return (
    <div className="p-6">
      <Tabs
        aria-label="Pipeline"
        value={index}
        onChange={(event, value) => setIndex(value)}
      >
        <TabList
          sx={{
            pt: 1,
            [`&& .${tabClasses.root}`]: {
              flex: "initial",
              bgcolor: "transparent",
              "&:hover": {
                bgcolor: "transparent",
              },
              [`&.${tabClasses.selected}`]: {
                color: "primary.plainColor",
                "&::after": {
                  height: 2,
                  borderTopLeftRadius: 3,
                  borderTopRightRadius: 3,
                  bgcolor: "primary.500",
                },
              },
            },
          }}
        >
          <Tab indicatorInset>Polygons management</Tab>
          <Tab indicatorInset>Markers management</Tab>
        </TabList>
        <div>
          <TabPanel value={0}>
            <PolygonsManagmentTable />
          </TabPanel>
          <TabPanel value={1}>
            <MarkersManagmentTable />
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
};

export default ManagementTables;
