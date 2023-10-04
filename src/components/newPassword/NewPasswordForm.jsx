import React, { useState, useEffect, useRef } from "react";
import { PropTypes } from "prop-types";
import { changePassword } from "./js/changePassword";

import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Avatar from "@mui/material/Avatar";
import IconButton from '@mui/material/IconButton';
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import InputLabel from "@mui/material/InputLabel";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import "../../../public/SignUpStyle.css";

import * as yup from "yup";

import { Link, Outlet, useNavigate, useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  CodePW: yup
    .string()
    .required("verification code is required")
    .min(5, "verification code must be at least 5 characters long")
    .max(5, "verification code must be at most 5 characters long"),
  Password: yup
    .string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters long")
    .max(80, "Password must be at most 80 characters long"),
  Newpassword: yup
    .string()
    .oneOf([yup.ref("Password"), null], "Passwords must match")
    .required("Password confirmation is required")
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


export default function NewPasswordForm() {
    const navigate = useNavigate();
    let dataUser = useOutletContext();
    useEffect(() => {
        if (dataUser.User === "" && dataUser.Email === "") {
            navigate("/RecoveryPassword");
          }
    }, []);
   
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm(
    { mode: "all", 
    resolver: yupResolver(schema),
    defaultValues: {  
        CodePW: "",
        Password: "",
        Newpassword: "",
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
        data = {...data, ...dataUser}
        loadingAnConnect(data)
      })();
  }

  const loadingAnConnect = async (data) => {
    setIsLoading(true);
    setProgress(0);
    try {
      const response = await changePassword(data , (progress) => {
        setProgress(progress);
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        navigate("/SignIn");
      }, 1000);
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
          Change Password!
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
          enter the code we have sent to your email  and the new password for your account </Typography>
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
            paddingY={{ xs: 3, sm: 3, md: 12 }}
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
                        > didn't receive the mail?{" "}
                        <Link to={`/RecoveryPassword`} id="RecoveryPassword">
                            forward mail
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
                  <VpnKeyIcon  sx={{ color: "#252422" }} />
                </Avatar>
                <TextField
                  {...register("CodePW")}
                  id="CodePW"
                  label="Code"
                  fullWidth
                  variant="standard"
                  required
                  type="text"
                  sx={{ marginTop: "5px" }}
                  inputProps={{ maxLength: 5 }}
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
                  {errors.CodePW?.message}
                </Typography>
              </Box>
              <Box sx={{ my: "10px" }}>
                <Avatar sx={{ bgcolor: "#a976c3" }}>
                  <PhoneAndroidIcon sx={{ color: "#252422" }} />
                </Avatar>
                <InputLabel htmlFor="outlined-adornment-password">
                  New Password
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
                <InputLabel htmlFor="outlined-adornment-Newpassword">
                  Confirm Password
                </InputLabel>
                <OutlinedInput {...register("Newpassword")}
                  id="outlined-adornment-Newpassword"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle Newpassword visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Newpassword"
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
                  {errors.Newpassword?.message}
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
      <Outlet />
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
