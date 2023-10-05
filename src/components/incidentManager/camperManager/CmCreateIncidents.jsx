import React, { useState, useEffect, useRef } from "react";
import { PropTypes } from "prop-types";

import { postInc } from "./js/postIncidents";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import LivingIcon from "@mui/icons-material/Living";
import CategoryIcon from '@mui/icons-material/Category';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Select from "@mui/material/Select";

import { getType_Inc } from "../../../services/Type_Inc";
import { getCategory_Inc } from "../../../services/Category_Inc";
import { getClassroom } from "../../../services/Classroom";
import { getAreas } from "../../../services/Area";

import * as yup from "yup";
import { Link, Outlet, useOutletContext, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
    Description: yup
    .string()
    .required("Description is required")
    .min(3, "Description must be at least 3 characters long")
    .max(600, "Description must be at most 600 characters long")
    .matches(
      /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ,.\s'"!?-]+$/,
      "Description must only contain alphanumeric characters, spaces and specific accented characters."
    ),
  PC: yup
    .number("PC must be a Number")
});

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" size={200} {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          sx={{
            my: 4,
            opacity: 0.9,
            display: "block",
            fontSize: "4rem",
            textAlign: "center",
            fontWeight: 700,
            fontFamily: "monospace",
            color: "#f4e6ff",
          }}
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export default function CmCreateIncidents() {
  let UserLocal = JSON.parse(localStorage.getItem("myUserInfo"));
  let Token = useOutletContext();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      Description: "",
      PC: 0,
    },
  });
  const [isArea, setIsArea] = React.useState();
  const [isClassroom, setIsClassroom] = React.useState();
  const [isType, setIsType] = React.useState();
  const [isCategory, setIsCategory] = React.useState();
  const [Area, setArea] = React.useState("");
  const [Type, setType] = React.useState("");
  const [Category, setCategory] = React.useState("");
  const [Classroom, setClassroom] = React.useState("");
  const [Peripheral, setPeripheral] = React.useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPC, setIsPC] = useState(false);
  const [progress, setProgress] = React.useState(10);
  const navigate = useNavigate();
  let count = 0;

  const handleChange = (event) => {
    setArea(event.target.value);
  };
  const handleChangeC = (event) => {
    setClassroom(event.target.value);
  };
  const handleChangeT = (event) => {
    setType(event.target.value);
    if (event.target.value == 1 || event.target.value == 2) {
        setIsPC(true);
    } else {
        setPeripheral("");
        setIsPC(false);
    }
  };
  const handleChangeCa = (event) => {
    setCategory(event.target.value);
  };
  const handleChangeP = (event) => {
    setPeripheral(event.target.value);
  };

  const eventSubmit = (event) => {
    event.preventDefault();
    handleSubmit((data) => {
        data.user_Incident = UserLocal.idUser;
      loadingAnConnect(data);
    })();
  };

  const loadingAnConnect = async (data) => {
    setIsLoading(true);
    setProgress(0);
    try {
        console.log(data);
        const response = await postInc(data, (progress) => {
          setProgress(progress);
        }, Token);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      //   setTimeout(() => {
      //     navigate("/SignIn");
      //   }, 1000);
    }
  };
  async function selectParameters(token) {
    let selectArea = [];
    let selectTypes = [];
    let selectClassroom = [];
    let selectCategory = [];

    let { data: Areas } = await getAreas((progress) => {setProgress(progress);}, token);
    let { data: Types } = await getType_Inc((progress) => {setProgress(progress);}, token);
    let { data: Categories } = await getCategory_Inc((progress) => {setProgress(progress);}, token);
    let { data: Classroom } = await getClassroom((progress) => {setProgress(progress);}, token);

    Areas.forEach((area) => {
      selectArea.push(
        <MenuItem key={area._id} value={area._id}>
          {area.A_Name}
        </MenuItem>
      );
    });
    Classroom.forEach((classroom) => {
        selectClassroom.push(
          <MenuItem key={classroom._id} value={classroom._id}>
            {classroom.Sln_Name}
          </MenuItem>
        );
      });
    Types.forEach((type) => {
      selectTypes.push(
        <MenuItem key={type._id} value={type._id}>
          {type.Typ_Name}
        </MenuItem>
      );
    });
    Categories.forEach((categority) => {
        selectCategory.push(
          <MenuItem key={categority._id} value={categority._id}>
            {categority.Cat_Name}
          </MenuItem>
        );
    });
    setIsArea(selectArea);
    setIsClassroom(selectClassroom);
    setIsType(selectTypes);
    setIsCategory(selectCategory);
  }
  useEffect(() => {
    if (count <= 0) {
      if (!Token) {
        navigate("/Manager/Camper/Home");
      } else {
        selectParameters(Token);
      }
      count++;
    }
  }, []);

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
          }}
          className="underline"
        >
          upload your incidence!
        </Typography>
        <Typography
          sx={{
            opacity: 0.9,
            display: "block",
            fontSize: "1.2rem",
            textAlign: "center",
            fontWeight: 700,
            fontFamily: "monospace",
            color: "#331d36",
          }}
        >
          in this space you can upload your incidents, remember to express
          yourself well at the moment you upload the incident{" "}
        </Typography>

        <form className="form" onSubmit={eventSubmit}>
          <Box display="flex" flexDirection="row" gap={"10%"}>
            <Box sx={{ my: "10px" }}>
              <Avatar sx={{ bgcolor: "#a976c3" }}>
                <LivingIcon sx={{ color: "#252422" }} />
              </Avatar>
              <InputLabel id="Area">Area</InputLabel>
              <Select
                {...register("Area")}
                labelId="Area-select-label"
                id="DTSelecter"
                value={Area}
                label="Area"
                onChange={handleChange}
                required
              >
                {isArea}
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
              <Avatar sx={{ bgcolor: "#a976c3" }}>
                <MeetingRoomIcon sx={{ color: "#252422" }} />
              </Avatar>
              <InputLabel id="Classroom">Classroom</InputLabel>
              <Select
                {...register("Classroom")}
                labelId="Classroom-select-label"
                id="ClassroomSelecter"
                value={Classroom}
                label="Classroom"
                onChange={handleChangeC}
                required
              >
                {isClassroom}
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
          <Box display="flex" flexDirection="row" gap={"10%"}>
            <Box sx={{ my: "10px" }}>
              <Avatar sx={{ bgcolor: "#a976c3" }}>
                <DocumentScannerIcon sx={{ color: "#252422" }} />
              </Avatar>
              <InputLabel id="Type">Type</InputLabel>
              <Select
                {...register("Type")}
                labelId="Type-select-label"
                id="TypeSelecter"
                value={Type}
                label="Type"
                onChange={handleChangeT}
                required
              >
                {isType}
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
              <Avatar sx={{ bgcolor: "#a976c3" }}>
                <CategoryIcon sx={{ color: "#252422" }} />
              </Avatar>
              <InputLabel id="Category">Category</InputLabel>
              <Select
                {...register("Category")}
                labelId="Category-select-label"
                id="CategorySelecter"
                value={Category}
                label="Category"
                onChange={handleChangeCa}
                required
              >
                {isCategory}
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
          {isPC && (
            <div className="pc">
                <Box display="flex" flexDirection="row" gap={"10%"}>
                <Box sx={{ my: "10px" }}>
            <Avatar sx={{ bgcolor: "#a976c3" }}>
              <AccountCircle sx={{ color: "#252422" }} />
            </Avatar>
            <TextField
              {...register("PC")}
              id="PC"
              label="PC"
              fullWidth
              variant="standard"
              required
              InputProps={{
                startAdornment: <InputAdornment position="start">CP-</InputAdornment>,
              }}
              type="number"
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
              {errors.PC?.message}
            </Typography>
          </Box>
                    <Box sx={{ my: "10px" }}>
                    <Avatar sx={{ bgcolor: "#a976c3" }}>
                        <CategoryIcon sx={{ color: "#252422" }} />
                    </Avatar>
                    <InputLabel id="Peripheral">Peripheral</InputLabel>
                    <Select
                        {...register("Peripheral")}
                        labelId="Peripheral-select-label"
                        id="PeripheralSelecter"
                        value={Peripheral}
                        label="Peripheral"
                        onChange={handleChangeP}
                        required
                    >
                        <MenuItem key="0" value="0">PC</MenuItem>
                        <MenuItem key="1" value="1">Mouses</MenuItem>
                        <MenuItem key="2" value="2">Keyboards</MenuItem>
                        <MenuItem key="3" value="3">Screens</MenuItem>
                        <MenuItem key="4" value="4">Diadems_Gamers</MenuItem>
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
            </div>
            )}
          <Box sx={{ my: "10px" }}>
            <Avatar sx={{ bgcolor: "#a976c3" }}>
              <AccountCircle sx={{ color: "#252422" }} />
            </Avatar>
            <TextField
              {...register("Description")}
              id="Description"
              label="Description"
              multiline
              maxRows={4}
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
              {errors.Description?.message}
            </Typography>
          </Box>
          <Button
            variant="contained"
            className="button"
            type="submit"
            endIcon={<SendIcon />}
            sx={{
              justifyContent: "center",
              alignContent: "center",
              display: "flex",
              bgcolor: "#a976c3",
            }}
          >
            Send
          </Button>
        </form>
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
