import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Button, Stack, TextField } from "@mui/material";
import { grey } from "@mui/material/colors";

const anchorPlace = "bottom";

interface Props {
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TabletDownDrawer(props: Props) {
  const { openDrawer, setOpenDrawer } = props;

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpenDrawer(open);
    };

  return (
    <SwipeableDrawer
      anchor={anchorPlace}
      open={openDrawer}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
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
    </SwipeableDrawer>
  );
}
