import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import { useResponsive } from "@/hooks/use-responsive";
import { grey } from "@mui/material/colors";
import { Button, Stack, TextField } from "@mui/material";

const laptopDrawerWidth = 300;
const desktopDrawerWidth = 400;

export default function LaptopUpDrawer() {
  const desktopUp = useResponsive("up", "desktop");

  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        width: desktopUp ? desktopDrawerWidth : laptopDrawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: desktopUp ? desktopDrawerWidth : laptopDrawerWidth,
          boxSizing: "border-box",
          bgcolor: grey[300],
        },
      }}
    >
      <Toolbar />
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        gap={3}
        py={3}
        sx={{ overflow: "auto", color: grey[400] }}
      >
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          sx={{ width: "80%" }}
        />
        <Button variant="contained" color="primary" sx={{ width: "80%" }}>
          execute
        </Button>
      </Stack>
    </Drawer>
  );
}
