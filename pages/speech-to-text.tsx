import { FooterHeight, HeaderHeight } from "@/components/layout/layout-config";
import ExperimentalResultView from "@/components/speechToText/experimentalResultView";
import LaptopUpDrawer from "@/components/speechToText/laptopUpDrawer";
import TabletDownDrawer from "@/components/speechToText/tabletDownDrawer";
import { useResponsive } from "@/hooks/use-responsive";
import { Box, Button, Drawer, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
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
        height: `calc(100vh - ${HeaderHeight}px - ${FooterHeight}px)`,
      }}
    >
      <ExperimentalResultView />
      {laptopUp ? (
        <LaptopUpDrawer />
      ) : (
        <TabletDownDrawer
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
        />
      )}
      {/* {laptopUp && <Box sx={{ width: 250, bgcolor: "blue" }}>drawer place</Box>} */}
      {/* <Box sx={{ width: "100vw", bgcolor: "red" }}>
      </Box> */}
    </Stack>
  );
}
export default SpeechToText;
