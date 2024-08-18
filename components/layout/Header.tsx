import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  Box,
} from "@mui/material";
import { MenuItem } from "@mui/material";

import { Menu as MenuIcon, AccountCircle } from "@mui/icons-material";
import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { useResponsive } from "@/hooks/use-responsive";

interface HeaderProps {
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}

export function Header(props: HeaderProps) {
  const router = useRouter();
  const laptopDown = useResponsive("down", "laptop");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickLink = (href: string) => {
    router.push(href);
    handleClose();
    if (laptopDown) props.setOpenDrawer(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        width: "100vw",
        p: 0,
        m: 0,
        height: {
          mobile: 56,
          laptop: 56,
        },
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() =>
            props.setOpenDrawer((prevDrawerState) => !prevDrawerState)
          }
        >
          <MenuIcon />
        </IconButton>
        <Box flexGrow={1}>
          <Typography
            variant="h6"
            fontFamily="__Pacifico_335c89"
            component="div"
            onClick={() => handleClickLink("/")}
            sx={{
              width: "max-content",
              ":hover": {
                cursor: "pointer",
              },
            }}
          >
            Niginigi-onigiri playground
          </Typography>
        </Box>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleClickLink("/user-profile")}>
              Profile
            </MenuItem>
            <MenuItem onClick={() => signOut()}>Log out</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}
