import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import EachExperimentalDataCard from "./eachExperimentalResultCard";
import { useResponsive } from "@/hooks/use-responsive";
import { desktopDrawerWidth, laptopDrawerWidth } from "./speechToText-config";

import { Schema } from "@/amplify/data/resource";

interface ExperimentalResultViewProps {
  experimentData: Array<Schema["ExperimentalData"]["type"]>;
}

export default function ExperimentalResultView({
  experimentData,
}: ExperimentalResultViewProps) {
  const desktopUp = useResponsive("up", "desktop");
  const laptopUp = useResponsive("up", "laptop");

  return (
    <Box
      sx={{
        width: desktopUp
          ? `calc(100% - ${desktopDrawerWidth}px)`
          : laptopUp
          ? `calc(100% - ${laptopDrawerWidth}px)`
          : "100%",
        height: "98%",
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
      >
        {experimentData.map((eachExperimentData, index) => (
          <Grid
            mobile={12}
            tablet={6}
            laptop={4}
            desktop={3}
            key={index}
            display="flex"
            justifyContent="center"
          >
            <EachExperimentalDataCard eachExperimentData={eachExperimentData} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
