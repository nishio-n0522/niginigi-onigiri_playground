import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { Toolbar } from "@mui/material";
import { grey } from "@mui/material/colors";
import { pageConfig } from "../../pages-config/PageConfig";
import { useRouter } from "next/navigation";
import { useResponsive } from "../../hooks/use-responsive";

interface TemporaryDrawerProps {
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}

export default function TemporaryDrawer(props: TemporaryDrawerProps) {
  // const laptopUp = useResponsive("up", "laptop");  //  あとで調整
  const router = useRouter();

  const handleClickLink = (href: string) => {
    router.push(href);

    props.setOpenDrawer(false); // あとで調整
    // if (!laptopUp) props.setOpenDrawer(false);  // あとで調整
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {pageConfig.map((eachPageConfig, index) => (
          <ListItem key={index} disablePadding style={{ color: grey[400] }}>
            <ListItemButton onClick={() => handleClickLink(eachPageConfig.to)}>
              <ListItemIcon
                sx={{
                  color: grey[400],
                  fill: grey[400],
                  height: "1.5rem",
                  minWidth: "40px",
                }}
              >
                {eachPageConfig.icon}
              </ListItemIcon>
              <ListItemText primary={eachPageConfig.pageName} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      variant="temporary"
      // variant={laptopUp ? "persistent" : "temporary"}  // あとで調整
      open={props.openDrawer}
      onClose={() => props.setOpenDrawer(false)}
      sx={{ flexShrink: 0 }}
      PaperProps={{ sx: { bgcolor: grey[900], color: grey[400] } }}
    >
      <Toolbar />
      {DrawerList}
    </Drawer>
  );
}
