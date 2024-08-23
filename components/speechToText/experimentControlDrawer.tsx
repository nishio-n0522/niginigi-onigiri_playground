import * as React from "react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/api";
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
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { desktopDrawerWidth, laptopDrawerWidth } from "./speechToText-config";
import dayjs from "dayjs";
import { getCurrentUser } from "aws-amplify/auth";
import { CloudUpload } from "@mui/icons-material";
import { StorageManager } from "@aws-amplify/ui-react-storage";
import { uploadData } from "aws-amplify/storage";

interface ExperimentControlDrawerProps {
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

const client = generateClient<Schema>({ authMode: "userPool" });

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function ExperimentControlDrawer(
  props: ExperimentControlDrawerProps
) {
  const { openDrawer, setOpenDrawer } = props;

  const [confirm, setConfirm] = React.useState<boolean>(false);
  const laptopUp = useResponsive("up", "laptop");
  const desktopUp = useResponsive("up", "desktop");
  const [experimentName, setExperimentName] = React.useState<string>("");
  const [uploadFile, setUploadFile] = React.useState<File | null>(null);
  const [disableExecButton, setDisableExecButton] =
    React.useState<boolean>(true);

  const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(event.target.files);
    if (file) setUploadFile(file);
  };

  const handleInputExperimentName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const tempExperimentName = event.target.value;
    setExperimentName(tempExperimentName);
  };

  const execSpeechToTextExperiment = async () => {
    if (!uploadFile) return;
    const { userId } = await getCurrentUser();

    const fileExtension = uploadFile.name.split(".").pop();
    const s3FileName = self.crypto.randomUUID() + "." + fileExtension;
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(uploadFile);

    fileReader.onload = async (event) => {
      if (!event.target || !event.target.result) return;
      try {
        await uploadData({
          data: event.target.result,
          path: ({ identityId }) =>
            `speech-to-text/${identityId}/${s3FileName}`,
        });
      } catch (err) {
        console.warn(err);
        return;
      }
      try {
        await client.models.ExperimentalData.create({
          owner: userId,
          experimentName: experimentName,
          experimentOrderDate: dayjs().format("YYYY/MM/DD HH:mm.ss"),
          s3FileName: s3FileName,
          audioFileName: uploadFile.name,
          status: "Pending",
        });
      } catch (err) {
        console.warn(err);
      }
    };
  };

  // Drawerの開閉でフォームデータをリセット
  React.useEffect(() => {
    if (!!laptopUp) return;
    setExperimentName("");
    setUploadFile(null);
    setConfirm(false);
  }, [openDrawer]);

  // Executeボタンの有効化チェック
  React.useEffect(() => {
    if (!experimentName) return setDisableExecButton(true);
    if (!uploadFile) return setDisableExecButton(true);
    if (!confirm) return setDisableExecButton(true);
    setDisableExecButton(false);
  }, [experimentName, uploadFile, confirm]);

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
          Start speech to text
        </Typography>
        <TextField
          id="outlined-basic"
          label="Experiment name"
          variant="outlined"
          size="small"
          onChange={handleInputExperimentName}
          sx={{ width: "80%" }}
        />
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Button
            component="label"
            role={undefined}
            variant="outlined"
            tabIndex={-1}
            startIcon={<CloudUpload />}
            sx={{ width: "80%", mb: 0.5 }}
          >
            Upload audio file
            <VisuallyHiddenInput
              accept="audio/*"
              type="file"
              onChange={handleUploadFile}
            />
          </Button>
          <Typography variant="body2" sx={{ width: "80%" }}>
            File: {!!uploadFile && uploadFile.name}
          </Typography>
        </Stack>
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
          disabled={disableExecButton}
          sx={{ width: "80%" }}
          onClick={execSpeechToTextExperiment}
        >
          execute
        </Button>
      </Stack>
    </Drawer>
  );
}
