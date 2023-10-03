import React, { useState, useEffect, useRef } from "react";
import { PropTypes } from "prop-types";
import { loginUser } from "./js/SignIn";

import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';
import Typography from "@mui/material/Typography";
import LogoutIcon from '@mui/icons-material/Logout';
import { Grid } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Avatar from "@mui/material/Avatar";
import IconButton from '@mui/material/IconButton';
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputLabel from "@mui/material/InputLabel";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';

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
  Password: yup
    .string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters long")
    .max(80, "Password must be at most 80 characters long"),
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


export default function SignInForm() {
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
      Password: "",
    }, });

  const [showPassword, setShowPassword] = React.useState(false);
  const [progress, setProgress] = React.useState(10);
  const [isLoading, setIsLoading] = useState(false);


  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const eventSubmit = (event) => {
    event.preventDefault();
      handleSubmit((data) => {
        loadingAnConnect(data)
      })();
  }

  const loadingAnConnect = async (data) => {
    setIsLoading(true);
    setProgress(0);
    try {
      const response = await loginUser(data , (progress) => {
        setProgress(progress);
      });
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
      >
        <Typography
          sx={{
            display: "flex",
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
          <Link to={`/`} id="goHome">
            <Avatar sx={{ bgcolor: "#a976c3", my: '40%' , marginRight: '5px'}}>
                  <LogoutIcon sx={{ color: "#fffef" }} />
            </Avatar>
          </Link>
          {" "}
          Sign In!
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
                        >Don't have an account? {" "}
                        <Link to={`/SignUp`} id="SingUp">
                          Sign up
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
            minHeight={100}
            paddingY={{ xs: 3, sm: 3, md: 10 }}
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
                  <PhoneAndroidIcon sx={{ color: "#252422" }} />
                </Avatar>
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput {...register("Password")}
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
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
                  {errors.Password?.message}
                </Typography>
              </Box>
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
                        >
                        <Link to={`/RecoveryPassword`} id="SingUp">
                          Forgot password?
                        </Link></Typography>
              <Button variant="contained" className="button" type="submit" endIcon={<LoginIcon />} sx={{justifyContent: "center",
              alignContent: "center", display: "flex", bgcolor:"#a976c3"}}>
                Login
              </Button>
            </form>
          </Grid>
        </Grid>
      </Box>
      <Outlet />
    </>
  );
}

const itemData = [
  {
    img: "https://i.pinimg.com/originals/d6/eb/fa/d6ebfac3851de2319467268b64ee427d.gif",
    title: "icon1",
  },
  {
    img: "https://i.pinimg.com/originals/f0/9f/3b/f09f3bb17a4b605cd9c7f0654056f221.gif",
    title: "icon2",
  },
  {
    img: "https://i.pinimg.com/originals/06/bd/f8/06bdf8ad69ff62062ae7dceb250d8866.gif",
    title: "icon3",
  },
];
