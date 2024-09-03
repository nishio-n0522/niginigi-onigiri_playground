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

    // const callApi = (jwtToken: string) => {
    //   axios
    //     .get(
    //       "https://g9t64p343c.execute-api.ap-northeast-1.amazonaws.com/dev/v1/test",
    //       {
    //         // .get("https://api.niginigi-onigiri.studio/v1/test", {
    //           headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${jwtToken}`,
    //           },
    //           data: {}, // axiosで送信データがないとき、headerのcontent-typeが送信されないという仕様があるため
    //           withCredentials: true,
    //         }
    //       )
    //       .then((response) => {
    //         console.log(response);
    //       })
    //       .catch((err) => console.log("err", err));
    //     };

    const callApi = (jwtToken: string) =>
      axios
        .post(
          "https://g9t64p343c.execute-api.ap-northeast-1.amazonaws.com/dev/v1/test",
          data,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log("err", err));

    fetchAuthSession().then((res) => {
      console.log("nanikore", res);
      if (!res.tokens || !res.tokens.idToken) return;
      const jwtToken = res.tokens.idToken.toString();
      callApi(jwtToken);
    });
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
