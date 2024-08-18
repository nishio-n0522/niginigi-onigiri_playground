import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import Image from "next/image";

import { Box, Stack, Typography } from "@mui/material";

import homeRabbitImg from "@/public/onigiriRabbitImg.png";
import { grey } from "@mui/material/colors";

import "@aws-amplify/ui-react/styles.css";

// const client = generateClient<Schema>();

export default function App() {
  // const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  // function listTodos() {
  //   client.models.Todo.observeQuery().subscribe({
  //     next: (data) => setTodos([...data.items]),
  //   });
  // }

  // useEffect(() => {
  //   listTodos();
  // }, []);

  // function createTodo() {
  //   client.models.Todo.create({
  //     content: window.prompt("Todo content"),
  //   });
  // }

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
      </Stack>
    </Stack>
  );
}
