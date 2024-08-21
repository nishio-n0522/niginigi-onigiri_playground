import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Stack, Typography } from "@mui/material";

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

export default function FileUploadButton() {
  const [uploadFileName, setUploadFileName] =
    React.useState<string>("not exist");

  const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setUploadFileName(file.name);
  };

  return (
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
        startIcon={<CloudUploadIcon />}
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
        File: {uploadFileName}
      </Typography>
    </Stack>
  );
}
