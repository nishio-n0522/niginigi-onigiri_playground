import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  Box,
  Avatar,
} from "@mui/material";
import { MenuItem } from "@mui/material";

import { Menu as MenuIcon, AccountCircle } from "@mui/icons-material";
import { fetchUserAttributes, signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { HeaderHeight } from "./layout-config";

interface HeaderProps {
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}

export function Header(props: HeaderProps) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [nickname, setNickname] = useState<undefined | null | string>(null);

  useEffect(() => {
    if (!!nickname) return;
    fetchUserAttributes()
      .then((res) => setNickname(res.nickname))
      .catch((err) => console.log("err"));
  }, [nickname]);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickLink = (href: string) => {
    router.push(href);
    handleClose();

    props.setOpenDrawer(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log("nickname", nickname);

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        width: "100vw",
        p: 0,
        m: 0,
        height: HeaderHeight,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxSizing: "border-box",
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
            {!nickname ? (
              <AccountCircle />
            ) : (
              <Avatar sx={{ width: "32px", height: "32px", fontSize: "18px" }}>
                {nickname[0]}
              </Avatar>
            )}
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
