import React, { useState, useEffect, useRef } from "react";
import { PropTypes } from "prop-types";
import { sendRecoveryCode } from "./js/RecoveryCodeForm";

import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import * as yup from "yup";

import "../../../public/SignUpStyle.css";

import { Link, Outlet, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  Username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters long")
    .max(45, "Username must be at most 45 characters long")
    .matches(
      /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ '-]+$/,
      "Username must be a text without special characters"
    ),
  Email: yup
    .string()
    .required("Email is required")
    .min(15, "Email must be at least 15 characters long")
    .max(150, "Email must be at most 150 characters long")
    .test("isGmail", "Only Gmail addresses are allowed", (value) =>
      value.endsWith("@gmail.com")
    ),
});

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex'}}>
      <CircularProgress variant="determinate"  size={200} {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary"
        sx={{
          my: 4,
          opacity: 0.9,
          display: 'block',
          fontSize: "4rem",
          textAlign: "center",
          fontWeight: 700,
          fontFamily: 'monospace',
          color: '#f4e6ff'
          }} >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}


export default function RecoveryCodeForm() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm(
    { mode: "all", 
    resolver: yupResolver(schema),
    defaultValues: {  
      Username: "",
      Email: "",
    }, });
    
  const [progress, setProgress] = React.useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
      User: '',
      Email: '',
  });
  const eventSubmit = (event) => {
    event.preventDefault();
      handleSubmit((data) => {
        loadingAnConnect(data)
      })();
  }

  const loadingAnConnect = async (data) => {
    setIsLoading(true);
    const recovery = document.querySelector(".sendCodeForm");
    setProgress(0);
    try {
        setFormData(data);
      const response = await sendRecoveryCode(data , (progress) => {
        setProgress(progress);
      });
      if (response.statusText == "OK") {
        setTimeout(() => {
          navigate("NewPasswordVerification");
          recovery.style.display = "none";
        }, 1500);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
  
      {isLoading && (
        <div className="loading">
          <CircularProgressWithLabel value={progress} />
        </div>
      )}
   
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          background: 'linear-gradient(rgba(244, 230, 255, 0.8), rgba(244, 230, 255, 0.8)), url("https://i.pinimg.com/originals/35/53/6c/35536ca602b93303937e57cba1f6707d.gif")', 
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          borderRadius: "2%",
          justifyContent: "center",
          alignContent: "center",
          flexDirection: "column",
          alignItems: "center",
          m: "2%",
        }}

        className = 'sendCodeForm'
      >
        <Typography
          sx={{
            display: "inline-block",
            position: "relative",
            fontSize: "3rem",
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
          Recovery Password!
        </Typography>
        <Typography 
              sx={{
                opacity: 0.9,
                display: 'block',
                fontSize: "1.2rem",
                textAlign: "center",
                fontWeight: 700,
                fontFamily: 'monospace',
                color: '#331d36'
                }}
        >
          enter your username and email to send you an email with your password recovery code </Typography>
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
            paddingY={{ xs: 3, sm: 3, md: 5 }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight={180}
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
            <Typography 
              sx={{
                my: 4,
                opacity: 0.9,
                display: 'block',
                fontSize: "1.2rem",
                textAlign: "center",
                fontWeight: 700,
                fontFamily: 'monospace',
                color: '#331d36'
                }}
                        >Remember your password?{" "}
                        <Link to={`/SignIn`} id="Signin">
                          Sign in
                        </Link></Typography>
          </Grid>

          <Grid
            item
            key={"FormSection"}
            xs={12}
            sm={10}
            md={5}
            width="100%"
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            minHeight={180}
            paddingY={{ xs: 3, sm: 3, md: 12 }}
          >
            <form className="form" onSubmit={eventSubmit}>
              <Box sx={{ my: "10px" }}>
                <Avatar sx={{ bgcolor: "#a976c3" }}>
                  <AccountCircle sx={{ color: "#252422" }} />
                </Avatar>
                <TextField
                  {...register("Username")}
                  id="Username"
                  label="UserName"
                  fullWidth
                  variant="standard"
                  required
                  type="text"
                  sx={{ marginTop: "5px" }}
                />
                <Typography
                  sx={{
                    opacity: 0.9,
                    border: "2px solid #58BC8",
                    caretColor: "#b6003f",
                    color: "#b6003f",
                    display: "block",
                    textAlign: "center",
                    fontWeight: 700,
                    fontFamily: "monospace",
                  }}
                >
                  {errors.Username?.message}
                </Typography>
              </Box>
              <Box sx={{ my: "10px" }}>
                <Avatar sx={{ bgcolor: "#a976c3" }}>
                  <EmailIcon sx={{ color: "#252422" }} />
                </Avatar>
                <TextField
                  {...register("Email")}
                  id="Email"
                  label="Email"
                  fullWidth
                  variant="standard"
                  required
                  type="email"
                  sx={{ marginTop: "5px" }}
                />
                <Typography
                  sx={{
                    opacity: 0.9,
                    border: "2px solid #58BC8",
                    caretColor: "#b6003f",
                    color: "#b6003f",
                    display: "block",
                    textAlign: "center",
                    fontWeight: 700,
                    fontFamily: "monospace",
                  }}
                >
                  {errors.Email?.message}
                </Typography>
              </Box>
              <Button variant="contained" className="button" type="submit" endIcon={<SendIcon />} sx={{justifyContent: "center",
              alignContent: "center", display: "flex", bgcolor:"#a976c3"}}>
                Send
              </Button>
            </form>
          </Grid>
        </Grid>
      </Box>
      <Outlet context={formData}/>
    </>
  );
}

const itemData = [
  {
    img: "https://i.pinimg.com/originals/fb/57/c3/fb57c3af41cfc27c60ad2609bede01a7.gif",
    title: "icon1",
  },
  {
    img: "https://i.pinimg.com/originals/47/17/a8/4717a813263f471b0def42d70c835ad5.gif",
    title: "icon2",
  },
  {
    img: "https://i.pinimg.com/originals/3d/45/8a/3d458aff1652aaae3cfd5b453af55d1f.gif",
    title: "icon3",
  },
];
