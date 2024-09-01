import Image from "next/image";

import { fetchAuthSession } from "aws-amplify/auth";

import { Box, Button, Stack, Typography } from "@mui/material";

import homeRabbitImg from "@/public/onigiriRabbitImg.png";
import { grey } from "@mui/material/colors";

import "@aws-amplify/ui-react/styles.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {
  const [text, setText] = useState<string>("None");

  const handleClick = () => {
    const data = {
      key1: "value1",
      key2: "value2",
    };

    axios
      .get("https://niginigi-onigiri.studio/api/test")
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log("err", err));

    // const callApi = (token: string) =>
    //   axios
    //     .post(
    //       "https://h6nad1f1qi.execute-api.ap-northeast-1.amazonaws.com/testing/api/v1/create-summary",
    //       data,
    //       {
    //         withCredentials: true,
    //         headers: {
    //           "Content-Type": "application/json",
    //           Authorization: `Bearer ${token}`,
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       console.log(response);
    //     })
    //     .catch((err) => console.log("err", err));

    // fetchAuthSession().then((res) => {
    //   console.log("nanikore", res);
    //   if (!res.tokens) return;
    //   console.log(res.tokens.idToken?.toString());
    //   callApi(res.tokens.accessToken.toString());
    // });
  };

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
          Home
        </Typography>
        <Box sx={{ width: "90px", osition: "relative" }}>
          <Image
            alt="rabbit.png"
            src={homeRabbitImg}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            priority={true}
          />
        </Box>
      </Stack>
      <Stack spacing={1} px={2}>
        <Typography variant="h6" color={grey[400]}>
          What is Niginigi-onigiri playground?
        </Typography>
        <Typography variant="body1" color={grey[400]}>
          This app is a playground for hobbyists to create and try out things in
          their spare time.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleClick}>
          test button
        </Button>
        <Typography color="white">{text}</Typography>
      </Stack>
    </Stack>
  );
}
