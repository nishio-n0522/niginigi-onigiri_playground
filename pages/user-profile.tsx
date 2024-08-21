import { grey } from "@mui/material/colors";

import Image from "next/image";

import { Box, Stack, Typography } from "@mui/material";

import constractorRabbitImg from "@/public/constractorRabbitImg.png";
import { fetchUserAttributes } from "aws-amplify/auth";

function UserProfile() {
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={3}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        pt={10}
        spacing={3}
        width="100vw"
      >
        <Typography
          variant="h4"
          fontFamily="__Pacifico_335c89"
          sx={{ color: grey[500] }}
        >
          User profile
        </Typography>
        <Box sx={{ width: "80px", osition: "relative" }}>
          <Image
            alt="rabbit.png"
            src={constractorRabbitImg}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            priority={true}
          />
        </Box>
      </Stack>
      <Stack spacing={1} px={2}>
        <Typography variant="body1" color={grey[400]}>
          User profile page is under constraction.
        </Typography>
      </Stack>
    </Stack>
  );
}
export default UserProfile;
