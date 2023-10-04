import React, { useState, useEffect, useRef } from "react";
import { PropTypes } from "prop-types";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import MenuIcon from "@mui/icons-material/Menu";
import { CardActionArea } from "@mui/material";

import { Link, Outlet, useNavigate } from "react-router-dom";

export default function CmHome() {
  let UserLocal = JSON.parse(localStorage.getItem("myUserInfo"));
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          background:
            'linear-gradient(rgba(244, 230, 255, 0.8), rgba(244, 230, 255, 0.8)), url("https://i.pinimg.com/originals/35/53/6c/35536ca602b93303937e57cba1f6707d.gif")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          borderRadius: "2%",
          justifyContent: "center",
          alignContent: "center",
          flexDirection: "column",
          alignItems: "center",
          m: "2%",
        }}
      >
        <Typography
          sx={{
            display: "flex",
            position: "relative",
            fontSize: {
              xs: "1.7rem", 
              sm: "2rem", 
              md: "3rem", 
            },
            fontWeight: 700,
            fontFamily: "monospace",
            color: "#5f2a62",
            letterSpacing: ".05em",
            textShadow: `4px 4px 0px #a976c3, 
                7px 7px 0px rgba(0, 0, 0, 0.2)`,
            whiteSpace: "nowrap",
            textTransform: "uppercase",
          }}
          className="underline"
        >
          {" "}
          welcome {!UserLocal ? "NN" : UserLocal.userName}!
        </Typography>
        <Grid
          container
          spacing={1}
          gap={{ xs: 3, sm: 3, md: 10 }}
          sx={{
            borderTop: "var(--Grid-borderWidth) solid",
            borderLeft: "var(--Grid-borderWidth) solid",
            borderColor: "divider",
            "& > div": {
              borderRight: "var(--Grid-borderWidth) solid",
              borderBottom: "var(--Grid-borderWidth) solid",
              borderColor: "divider",
            },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            item
            key={"textSection"}
            xs={12}
            sm={10}
            md={4}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight={100}
          >
            <div className="container">
              <div className="logo"></div>
            </div>
            <ImageList
              sx={{ width: "100%", height: "auto" }}
              cols={3}
              rowHeight={"auto"}
            >
              {itemData.map((item) => (
                <ImageListItem
                  key={item.img}
                  sx={{ width: "100%", height: "auto" }}
                >
                  <img
                    srcSet={`${item.img}`}
                    src={`${item.img}`}
                    alt={item.title}
                    key={item.title}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "10%",
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>

          <Grid
            item
            key={"WelcomeUser"}
            xs={12}
            sm={10}
            md={5}
            width="100%"
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            minHeight={100}
            paddingY={{ xs: 3, sm: 3, md: 0 }}
          >
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://i.pinimg.com/originals/dd/ca/b6/ddcab60dbf5290821f1d65f06b274ebd.gif"
                  alt="efficiency"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Incident Management System
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  welcome to your incident management space, click on the <MenuIcon /> to access your options menu, 
                  as a camper you have access to create incidents, update your incidents and delete your incidents. 
                  you can also view your classroom incidents.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Outlet />
    </>
  );
}

const itemData = [
  {
    img: "https://i.pinimg.com/originals/de/35/91/de3591016333a7f3858a153e96f8fbfa.gif",
    title: "icon1",
  },
  {
    img: "https://i.pinimg.com/originals/54/4c/60/544c60d809ef69b114010de734a4fe7a.gif",
    title: "icon2",
  },
  {
    img: "https://i.pinimg.com/originals/e9/87/8b/e9878b63f06b6a75025adfc036d50833.gif",
    title: "icon3",
  },
];
