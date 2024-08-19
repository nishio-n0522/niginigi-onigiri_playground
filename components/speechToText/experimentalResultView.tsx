import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import EachExperimentalResultCard from "./eachExperimentalResultCard";

export default function ExperimentalResultView() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "100%",
        height: "95%",
        overflow: "hidden",
        overflowY: "auto",
        m: 0,
      }}
    >
      <Grid
        container
        columns={12}
        spacing={{ mobile: 2, laptop: 3 }}
        p={{ mobile: 2, desktop: 3 }}
        // sx={{ overflow: "auto" }}
      >
        {Array.from(Array(20)).map((_, index) => (
          <Grid
            mobile={12}
            tablet={6}
            laptop={4}
            desktop={3}
            key={index}
            display="flex"
            justifyContent="center"
          >
            <EachExperimentalResultCard />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
