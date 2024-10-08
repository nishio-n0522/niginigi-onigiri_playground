import React from "react";
import { Typography, Stack } from "@mui/material";
import { FooterHeight } from "./layout-config";

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
        height: FooterHeight,
        p: 0,
        m: 0,
        boxSizing: "border-box",
      }}
    >
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
