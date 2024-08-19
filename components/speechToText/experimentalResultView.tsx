import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import EachExperimentalResultCard from "./eachExperimentalResultCard";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ExperimentalResultView() {
  return (
    <Box
      sx={{ flexGrow: 1, height: "95%", overflow: "hidden", overflowY: "auto" }}
    >
      <Grid
        container
        columns={12}
        spacing={{ mobile: 2, laptop: 3 }}
        p={{ mobile: 2, desktop: 3 }}
        // sx={{ overflow: "auto" }}
      >
        {Array.from(Array(6)).map((_, index) => (
          <Grid mobile={12} tablet={6} laptop={3} desktop={2} key={index}>
            <EachExperimentalResultCard />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
