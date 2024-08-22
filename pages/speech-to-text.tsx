import * as React from "react";

import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/api";

import ExperimentalResultView from "@/components/speechToText/experimentalResultView";
import ExperimentControlDrawer from "@/components/speechToText/experimentControlDrawer";
import { useResponsive } from "@/hooks/use-responsive";
import { Add } from "@mui/icons-material";
import { Fab, Stack } from "@mui/material";

const client = generateClient<Schema>({ authMode: "userPool" });
// const client = generateClient<Schema>();

function SpeechToText() {
  const laptopUp = useResponsive("up", "laptop");
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const [experimentData, setExperimentData] = React.useState<
    Array<Schema["ExperimentalData"]["type"]>
  >([]);

  React.useEffect(() => {
    const sub = client.models.ExperimentalData.observeQuery().subscribe({
      next: (data) => setExperimentData([...data.items]),
      error: (error) => console.warn(error),
    });
    return () => sub.unsubscribe();
  }, []);

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      sx={{
        width: "100vw",
        height: "100%",
        p: 0,
        m: 0,
        boxSizing: "border-box",
      }}
    >
      <ExperimentalResultView experimentData={experimentData} />
      {!laptopUp && (
        <Fab
          color="secondary"
          onClick={() => setOpenDrawer(true)}
          sx={{
            position: "absolute",
            bottom: 55,
            right: 30,
          }}
        >
          <Add />
        </Fab>
      )}
      <ExperimentControlDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
    </Stack>
  );
}
export default SpeechToText;
