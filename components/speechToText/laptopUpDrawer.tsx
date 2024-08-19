import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import { useResponsive } from "@/hooks/use-responsive";
import { grey } from "@mui/material/colors";
import { Button, Stack, TextField } from "@mui/material";
import FileUploadButton from "./fileUploadButton";

const laptopDrawerWidth = 300;
const desktopDrawerWidth = 400;

interface Props {
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LaptopUpDrawer(props: Props) {
  const { openDrawer, setOpenDrawer } = props;

  const laptopUp = useResponsive("up", "laptop");
  const desktopUp = useResponsive("up", "desktop");
  const [experimentName, setExperimentName] = React.useState<string>(
    "input experiment name"
  );

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (laptopUp) return;
      // if (
      //   event &&
      //   event.type === "keydown" &&
      //   ((event as React.KeyboardEvent).key === "Tab" ||
      //     (event as React.KeyboardEvent).key === "Shift")
      // ) {
      //   return;
      // }

      setOpenDrawer(open);
    };

  const handleInputExperimentName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("nanikore", event.target.value);
  };

  return (
    <Drawer
      variant={laptopUp ? "permanent" : "temporary"}
      anchor={laptopUp ? "right" : "bottom"}
      open={openDrawer}
      onClose={toggleDrawer(false)}
      sx={{
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: desktopUp
            ? desktopDrawerWidth
            : laptopUp
            ? laptopDrawerWidth
            : "100vw",
          boxSizing: "border-box",
          bgcolor: grey[100],
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
        sx={{ overflow: "auto" }}
      >
        <TextField
          id="outlined-basic"
          label="Experiment name"
          variant="outlined"
          size="small"
          onChange={handleInputExperimentName}
          sx={{ width: "80%" }}
        />
        <FileUploadButton />
        <Button variant="contained" color="primary" sx={{ width: "80%" }}>
          execute
        </Button>
      </Stack>
    </Drawer>
  );
}
