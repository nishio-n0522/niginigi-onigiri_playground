import ExperimentalResultView from "@/components/speechToText/experimentalResultView";
import ExperimentControlDrawer from "@/components/speechToText/experimentControlDrawer";
import { useResponsive } from "@/hooks/use-responsive";
import { Add } from "@mui/icons-material";
import { Fab, Stack } from "@mui/material";
import { useState } from "react";

function SpeechToText() {
  const laptopUp = useResponsive("up", "laptop");
  const [openDrawer, setOpenDrawer] = useState(false);

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
      <ExperimentalResultView />
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
