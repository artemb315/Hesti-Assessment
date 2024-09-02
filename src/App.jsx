import Grid from "@mui/joy/Grid";

import MapContainer from "./containers/MapContainer";
import ManagementContainer from "./containers/ManagementContainer";

function App() {
  return (
    <Grid container spacing={0} sx={{ height: "100vh" }}>
      <Grid
        item
        xs={12}
        md={6}
        lg={6}
        sx={{
          height: { xs: "50vh", md: "100vh" },
        }}
      >
        <MapContainer />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        lg={6}
        sx={{
          height: { xs: "50vh", md: "100vh" },
        }}
      >
        <ManagementContainer />
      </Grid>
    </Grid>
  );
}

export default App;
