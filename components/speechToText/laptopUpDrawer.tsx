import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import { useResponsive } from "@/hooks/use-responsive";
import { grey } from "@mui/material/colors";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import FileUploadButton from "./fileUploadButton";
import { desktopDrawerWidth, laptopDrawerWidth } from "./speechToText-config";

interface Props {
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LaptopUpDrawer(props: Props) {
  const { openDrawer, setOpenDrawer } = props;

  const [confirm, setConfirm] = React.useState<boolean>(false);

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
      {laptopUp && <Toolbar />}
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        gap={3}
        py={3}
        sx={{ overflow: "auto" }}
      >
        <Typography variant="h6" sx={{ width: "80%" }}>
          Test speech to text
        </Typography>
        <TextField
          id="outlined-basic"
          label="Experiment name"
          variant="outlined"
          size="small"
          onChange={handleInputExperimentName}
          sx={{ width: "80%" }}
        />
        <FileUploadButton />
        <Divider sx={{ width: "80%" }} />
        <Box sx={{ width: "80%" }}>
          <Typography variant="body2">
            機密情報が含まれるデータは絶対に入力しないでください
          </Typography>
          <FormControlLabel
            required
            control={
              <Checkbox
                onChange={(event) => setConfirm(event.target.checked)}
              />
            }
            label="確認しました"
            disableTypography={true}
            sx={{
              typography: (theme) => theme.typography.body2,
              verticalAlign: "bottom",
            }}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "80%" }}
          disabled={!confirm}
        >
          execute
        </Button>
      </Stack>
    </Drawer>
  );
}
