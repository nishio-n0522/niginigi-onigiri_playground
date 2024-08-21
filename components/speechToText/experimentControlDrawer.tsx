import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/api";
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
} from "@mui/material";
import FileUploadButton from "./fileUploadButton";
import { desktopDrawerWidth, laptopDrawerWidth } from "./speechToText-config";

interface ExperimentControlDrawerProps {
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

const client = generateClient<Schema>();

export default function ExperimentControlDrawer(
  props: ExperimentControlDrawerProps
) {
  const { openDrawer, setOpenDrawer } = props;

  const [confirm, setConfirm] = React.useState<boolean>(false);

  const laptopUp = useResponsive("up", "laptop");
  const desktopUp = useResponsive("up", "desktop");
  const [experimentName, setExperimentName] = React.useState<string>(
    "input experiment name"
  );

  const handleInputExperimentName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const tempExperimentName = event.target.value;
    setExperimentName(tempExperimentName);
  };

  const execSpeechToTextExperiment = async () => {
    try {
      await client.models.ExperimentalData.create({
        experimentName: experimentName,
        experimentOrderData: new Date().toISOString(),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Drawer
      variant={laptopUp ? "permanent" : "temporary"}
      anchor={laptopUp ? "right" : "bottom"}
      open={openDrawer}
      onClose={() => {
        if (!laptopUp) setOpenDrawer(false);
      }}
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
          disabled={!confirm}
          sx={{ width: "80%" }}
          onClick={execSpeechToTextExperiment}
        >
          execute
        </Button>
      </Stack>
    </Drawer>
  );
}
