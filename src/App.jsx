import Grid from "@mui/joy/Grid";

import MapContainer from "./containers/MapContainer";
import ManagementContainer from "./containers/ManagementContainer";

function App() {
  return (
    <Grid container spacing={0} sx={{ height: "100vh" }}>
      <Grid item xs={6} sx={{ height: "100%" }}>
        <MapContainer />
      </Grid>
      <Grid item xs={6} sx={{ height: "100%" }}>
        <ManagementContainer />
      </Grid>
    </Grid>
  );
}

export default App;
