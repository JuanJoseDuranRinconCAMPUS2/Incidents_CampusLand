import React, { useState, useEffect, useRef } from "react";
import { PropTypes } from "prop-types";
import { userCreation } from "./js/SignUp";

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
import EmailIcon from "@mui/icons-material/Email";
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import TodayIcon from "@mui/icons-material/Today";
import SettingsRemoteIcon from "@mui/icons-material/SettingsRemote";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ClassIcon from "@mui/icons-material/Class";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Select from "@mui/material/Select";

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
  Identification: yup
    .number("Identification must be a Number")
    .required("typeDoc is required"),
  Age: yup.number("Age must be a Number").required("typeDoc is required"),
  Celphone: yup.number("Age must be a Number").required("typeDoc is required"),
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


export default function SignUpForm() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "all", resolver: yupResolver(schema) });
  const [typeDoc, setTypeDoc] = React.useState("");
  const [Gender, setGender] = React.useState("");
  const [Rol, setRol] = React.useState("");
  const [Classroom, setClassrooml] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [progress, setProgress] = React.useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setTypeDoc(event.target.value);
  };
  const handleChangeG = (event) => {
    setGender(event.target.value);
  };
  const handleChangeR = (event) => {
    setRol(event.target.value);
  };
  const handleChangeC = (event) => {
    setClassrooml(event.target.value);
  };

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
      const response = await userCreation(data , (progress) => {
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
          bgcolor: "#a976c3",
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
          Sign Up!
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
                color: '#f4e6ff'
                }}
                        >Have an account?{" "}
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
                <Avatar sx={{ bgcolor: "#f4e6ff" }}>
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
                <Avatar sx={{ bgcolor: "#f4e6ff" }}>
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
              <Box display="flex" flexDirection="row" gap={"10%"}>
                <Box sx={{ my: "10px" }}>
                  <Avatar sx={{ bgcolor: "#f4e6ff" }}>
                    <DocumentScannerIcon sx={{ color: "#252422" }} />
                  </Avatar>
                  <InputLabel id="DT">Document type</InputLabel>
                  <Select
                    {...register("TypeDoc")}
                    labelId="DT-select-label"
                    id="DTSelecter"
                    value={typeDoc}
                    label="Document type"
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value={1}>Identity Document</MenuItem>
                    <MenuItem value={2}>Passport</MenuItem>
                    <MenuItem value={3}>Driver's License</MenuItem>
                  </Select>
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
                    {errors.TypeDoc?.message}
                  </Typography>
                </Box>
                <Box sx={{ my: "10px" }}>
                  <Avatar sx={{ bgcolor: "#f4e6ff" }}>
                    <DocumentScannerIcon sx={{ color: "#252422" }} />
                  </Avatar>
                  <InputLabel id="DT">Gender</InputLabel>
                  <Select
                    {...register("Gender")}
                    labelId="Gender-select-label"
                    id="GenderSelecter"
                    value={Gender}
                    label="Gender"
                    onChange={handleChangeG}
                    required
                  >
                    <MenuItem value={1}>Male</MenuItem>
                    <MenuItem value={2}>Female</MenuItem>
                    <MenuItem value={3}>Non-Binary</MenuItem>
                  </Select>
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
                    {errors.TypeDoc?.message}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ my: "10px" }}>
                <Avatar sx={{ bgcolor: "#f4e6ff" }}>
                  <AssignmentIndIcon sx={{ color: "#252422" }} />
                </Avatar>
                <TextField
                  {...register("Identification")}
                  id="Identification"
                  label="Identification"
                  fullWidth
                  variant="standard"
                  required
                  type="number"
                  sx={{ marginTop: "5px" }}
                  inputProps={{
                    min: 0,
                  }}
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
                  {errors.Identification?.message}
                </Typography>
              </Box>
              <Box sx={{ my: "10px" }}>
                <Avatar sx={{ bgcolor: "#f4e6ff" }}>
                  <TodayIcon sx={{ color: "#252422" }} />
                </Avatar>
                <TextField
                  {...register("Age")}
                  id="Age"
                  label="Age"
                  fullWidth
                  variant="standard"
                  required
                  type="number"
                  sx={{ marginTop: "5px" }}
                  inputProps={{
                    min: 0,
                    max: 100,
                  }}
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
                  {errors.Age?.message}
                </Typography>
              </Box>
              <Box sx={{ my: "10px" }}>
                <Avatar sx={{ bgcolor: "#f4e6ff" }}>
                  <PhoneAndroidIcon sx={{ color: "#252422" }} />
                </Avatar>
                <TextField
                  {...register("Celphone")}
                  id="Celphone"
                  label="Celphone"
                  fullWidth
                  variant="standard"
                  required
                  type="number"
                  sx={{ marginTop: "5px" }}
                  inputProps={{
                    min: 0,
                  }}
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
                  {errors.Celphone?.message}
                </Typography>
              </Box>
              <Box display="flex" flexDirection="row" gap={"10%"}>
                <Box sx={{ my: "10px" }}>
                  <Avatar sx={{ bgcolor: "#f4e6ff" }}>
                    <SettingsRemoteIcon sx={{ color: "#252422" }} />
                  </Avatar>
                  <InputLabel id="Rol">Rol User</InputLabel>
                  <Select
                    {...register("Rol")}
                    labelId="Rol-select-label"
                    id="RolSelecter"
                    value={Rol}
                    label="Rol User"
                    onChange={handleChangeR}
                    required
                  >
                    <MenuItem value={1}>Camper!</MenuItem>
                    <MenuItem value={2}>Trainer!</MenuItem>
                    <MenuItem value={3}>Admin!</MenuItem>
                  </Select>
                </Box>
                <Box sx={{ my: "10px" }}>
                  <Avatar sx={{ bgcolor: "#f4e6ff" }}>
                    <ClassIcon sx={{ color: "#252422" }} />
                  </Avatar>
                  <InputLabel id="DT">Classroom</InputLabel>
                  <Select
                    {...register("Classroom")}
                    labelId="Classroom-select-label"
                    id="ClassroomSelecter"
                    value={Classroom}
                    label="Classroom"
                    onChange={handleChangeC}
                    required
                  >
                    <MenuItem value={0}>Without Salon</MenuItem>
                    <MenuItem value={1}>M1</MenuItem>
                    <MenuItem value={2}>M2</MenuItem>
                    <MenuItem value={3}>M3</MenuItem>
                    <MenuItem value={4}>J1</MenuItem>
                    <MenuItem value={5}>J2</MenuItem>
                    <MenuItem value={6}>J3</MenuItem>
                    <MenuItem value={7}>V1</MenuItem>
                    <MenuItem value={8}>V2</MenuItem>
                  </Select>
                </Box>
              </Box>
              <Box sx={{ my: "10px" }}>
                <Avatar sx={{ bgcolor: "#f4e6ff" }}>
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
              <Button variant="contained" className="button" type="submit" endIcon={<SendIcon />} color="success" sx={{justifyContent: "center",
              alignContent: "center", display: "flex"}}>
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
