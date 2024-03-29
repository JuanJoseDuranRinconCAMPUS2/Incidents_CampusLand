import React, { useState, useEffect, useRef } from "react";
import config from "../../../utils/localStorage";
import { PropTypes } from "prop-types";

import { UserToken } from "../../../services/LoginUser";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import HomeIcon from '@mui/icons-material/Home';
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentReturnedIcon from "@mui/icons-material/AssignmentReturned";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import SnippetFolderIcon from "@mui/icons-material/SnippetFolder";
import FolderZipIcon from "@mui/icons-material/FolderZip";

import { Link, Outlet, useNavigate } from "react-router-dom";

const options = [
  {
    name: "Home",
    icon: <HomeIcon />,
    link: "/Manager/Trainer/Home",
  },
  {
    name: "my Incidents",
    icon: <AssignmentIcon />,
    link: "/Manager/Trainer/myIncidents",
  },
  {
    name: "Incidents",
    icon: <AssignmentReturnedIcon />,
    link: "/Manager/Trainer/Incidents",
  },
  {
    name: "classroom incidents",
    icon: <FolderZipIcon />,
    link: "/Manager/Trainer/classroomIncidents",
  },
  {
    name: "create incident",
    icon: <FolderSpecialIcon />,
    link: "/Manager/Trainer/CreateIncidents",
  },
  {
    name: "Update incident",
    icon: <SnippetFolderIcon />,
    link: "/Manager/Trainer/updateIncident",
  },
  {
    name: "delete Incident",
    icon: <FolderDeleteIcon />,
    link: "/Manager/Trainer/deleteIncident",
  },
  {
    name: "authorize users",
    icon: <AssignmentReturnedIcon />,
    link: "/Manager/Trainer/authorizeUsers",
  },
];

export default function TrainerManager() {
  const navigate = useNavigate();
  const logoutEvent = (event) => {
    let newUserLocal = { idUser: 0, roles: "", userName: "" };
    localStorage.setItem("myUserInfo", JSON.stringify(newUserLocal));
    navigate("/");
  };
  const settings = [
    {
      name: "My User",
      link: "/Manager/Trainer/UserInfo",
    },
    {
      name: "Logout",
      link: "#",
      event: logoutEvent,
    },
  ];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [state, setState] = React.useState({
    left: false,
  });
  const [token, setToken] = useState(null);

  let UserLocal = JSON.parse(localStorage.getItem("myUserInfo"));

  const requestToken = async (data) => {
    try {
      const response = await UserToken(data);
      if (response.data) {
        setToken(response.data.Token);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("myUserInfo")) {
      navigate("/");
    } else if (
      UserLocal.idUser === 0 &&
      UserLocal.userName === "" &&
      UserLocal.roles === ""
    ) {
      navigate("/");
    } else if (UserLocal.roles[0] != "Trainer"){
      navigate("/");
    } else {
      requestToken(UserLocal.idUser);
    }
  }, []);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        height: "100%",
        background:
          'linear-gradient(rgba(244, 230, 255, 0.8), rgba(244, 230, 255, 0.4)), url("https://i.pinimg.com/564x/9b/e9/93/9be99396550c6185218760193026407d.jpg")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        fontFamily: "monospace",
        color: "#5f2a62",
        borderRadius: "2%",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Divider />
        {options.map((option) => (
          <Link to={option.link} key={option.name}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{option.icon}</ListItemIcon>
                <ListItemText primary={option.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
        <Divider />
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#c18fdbc3" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: "flex" }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleDrawer("left", true)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <DesignServicesIcon sx={{ display: "flex", mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: "flex",
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Trainer_Manager
            </Typography>

            <Box
              sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}
            >
              <Tooltip title="account">
                <IconButton onClick={handleOpenUserMenu}>
                  <Avatar sx={{ bgcolor: "#1d1a2f" }}>
                    {!UserLocal ? "NN" : UserLocal.userName.charAt(0)}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "46px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                    <Link to={setting.link}>
                      <Typography
                        textAlign="center"
                        sx={{
                          mr: 2,
                          fontWeight: 720,
                          color: "#3f6d4e",
                          textDecoration: "none",
                        }}
                        onClick={setting.event}
                      >
                        {setting.name}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <React.Fragment key="left">
        <Drawer
          anchor="left"
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
      <Outlet context={token}/>
    </>
  );
}