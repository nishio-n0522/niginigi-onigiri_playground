import React from "react";
import { Typography, Stack, Divider } from "@mui/material";
import { grey } from "@mui/material/colors";

const Footer: React.FC = () => {
  return (
    <Stack
      component="footer"
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{
        width: "100vw",
        py: 1,
      }}
    >
      <Divider
        textAlign="center"
        variant="fullWidth"
        sx={{ color: grey[300] }}
      />
      <Typography
        variant="caption"
        fontFamily="__Concert_One_252401"
        sx={{
          color: (theme) => theme.palette.primary.contrastText,
        }}
      >
        © 2024 niginigi-onigiri
      </Typography>
    </Stack>
  );
};

export default Footer;
