import { ReactNode, useState } from "react";
import { Header } from "./Header";
import Footer from "./footer";
import { Stack } from "@mui/material";

import { useResponsive } from "../../hooks/use-responsive";
import TemporaryDrawer from "./Drawer";

interface LayoutProps {
  children: ReactNode;
}

export function Layout(props: LayoutProps) {
  // const laptopUp = useResponsive("up", "laptop");  // あとで調整する
  // const [openDrawer, setOpenDrawer] = useState(laptopUp);  // あとで調整する

  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={2}
      bgcolor="#111111"
      sx={{
        minHeight: "100vh",
        height: { laptop: "100vh" },
        width: "100vw",
        boxSizing: "border-box",
        p: 0,
        m: 0,
      }}
    >
      <Header setOpenDrawer={setOpenDrawer} />
      <Stack sx={{ flexGrow: 1 }}>
        {
          <TemporaryDrawer
            openDrawer={openDrawer}
            setOpenDrawer={setOpenDrawer}
          />
        }
        {props.children}
      </Stack>
      <Footer />
    </Stack>
  );
}
