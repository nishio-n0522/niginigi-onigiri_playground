import { ReactNode, useState } from "react";
import { Header } from "./Header";
import Footer from "./footer";
import { Stack } from "@mui/material";

import { useResponsive } from "../../hooks/use-responsive";
import TemporaryDrawer from "./Drawer";
import { FooterHeight, HeaderHeight } from "./layout-config";

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
        height: "100vh",
        width: "100vw",
        boxSizing: "border-box",
        p: 0,
        m: 0,
      }}
    >
      <Header setOpenDrawer={setOpenDrawer} />
      <Stack
        sx={{
          flexGrow: 1,
          width: "100vw",
          height: `calc(100vh - ${HeaderHeight}px - ${FooterHeight}px)`,
        }}
      >
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
