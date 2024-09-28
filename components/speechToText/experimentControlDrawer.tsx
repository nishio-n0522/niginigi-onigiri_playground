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
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  styled,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { desktopDrawerWidth, laptopDrawerWidth } from "./speechToText-config";
import dayjs from "dayjs";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";
import { CloudUpload } from "@mui/icons-material";
import { StorageManager } from "@aws-amplify/ui-react-storage";
import { uploadData } from "aws-amplify/storage";
import axios from "axios";

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
  const [genAiModel, setGenAiModel] = React.useState<"gpt" | "claude">("gpt");
  const [language, setLanguage] = React.useState("ja");

  const handleChangeGenAiModel = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGenAiModel(event.target.value as "gpt" | "claude");
  };

  const handleChangeLanguage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLanguage(event.target.value as "ja" | "en");
  };

  const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
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

    let filePath: string;
    fileReader.onload = async (event) => {
      if (!event.target || !event.target.result) return;

      try {
        const uploadTask = await uploadData({
          data: event.target.result,
          path: ({ identityId }) =>
            `speech-to-text/${identityId}/${s3FileName}`,
        });

        filePath = (await uploadTask.result.then((res) => res.path)).toString();
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
        return;
      }

      const requestBody = {
        userId,
        experimentName,
        filePath,
        outputLanguage: language,
        genAiModel,
      };

      console.log("requestBody", requestBody);

      // fetchAuthSession()
      //   .then((res) => {
      //     if (!res.tokens || !res.tokens.idToken) return;
      //     const jwtToken = res.tokens.idToken.toString();
      //     return axios.post(
      //       `${process.env.NEXT_PUBLIC_NIGINIGI_ONIGIRI_API_TEST_URL}/dev/v1/gen-ai/speech-to-text`,
      //       requestBody, // axiosで送信データがないとき、headerのcontent-typeが送信されないという仕様があるため
      //       {
      //         headers: {
      //           "Content-Type": "application/json",
      //           Authorization: `Bearer ${jwtToken}`,
      //         },
      //         withCredentials: true,
      //       }
      //     );
      //   })
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => console.log("err", err));
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
        <Box sx={{ py: 0, my: 0, width: "80%" }}>
          <FormControl>
            <FormLabel>Output language</FormLabel>
            <RadioGroup
              row
              name="row-radio-buttons-group"
              value={language}
              onChange={handleChangeLanguage}
            >
              <FormControlLabel
                value="ja"
                control={<Radio />}
                label="Japanese"
              />
              <FormControlLabel
                value="en"
                control={<Radio />}
                label="English"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box sx={{ py: 0, my: 0, width: "80%" }}>
          <FormControl>
            <FormLabel>Generative AI model</FormLabel>
            <RadioGroup
              row
              name="row-radio-buttons-group"
              value={genAiModel}
              onChange={handleChangeGenAiModel}
            >
              <FormControlLabel
                value="gpt"
                control={<Radio />}
                label="GPT-4o"
              />
              <FormControlLabel
                value="claude"
                control={<Radio />}
                label="chaude3.5 sonnet"
              />
            </RadioGroup>
          </FormControl>
        </Box>
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
