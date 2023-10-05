import React, { useState, useEffect, useRef } from "react";
import { PropTypes } from "prop-types";
import { DeleteUser } from "./js/DeleteUsers";
import { AuthorizaUser } from "./js/AuthorizeUsers";
import { authorizeUsers, getUsersNotAuthorized } from "../../../services/UserCreation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import PostAddIcon from '@mui/icons-material/PostAdd';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { CardActionArea } from "@mui/material";

import { Link, Outlet, useOutletContext, useNavigate } from "react-router-dom";


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

function renameIdKey(data) {
    return data.map((item) => {
      if (item._id !== undefined) {
        item.id = item._id;
        delete item._id;
      }
      return item;
    });
}

export default function CtauthorizeUsers() {
  let UserLocal = JSON.parse(localStorage.getItem("myUserInfo"));
  let Token = useOutletContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isDataNull, setIsDataNull] = useState(false);
  const [isData, setIsData] = useState(false);
  const [Response, setResponse] = useState({});
  const [progress, setProgress] = React.useState(10);
  const navigate = useNavigate();
  let count = 0;

  const handleDelete = async (userName) => {
    let data = { name_User : userName}
    const response = await DeleteUser(data, (progress) => {
        setProgress(progress);
    }, Token);
    navigate("/Manager/Trainer/Home");
};
const handleAuthorize = async (userName) => {
    let data = { name_User : userName}
    const response = await authorizeUsers(data, (progress) => {
        setProgress(progress);
    }, Token);
    navigate("/Manager/Trainer/Home");
};


const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'Name',
    headerName: 'Name User',
    width: 190,
    editable: false,
  },
  {
    field: 'Email',
    headerName: 'Email User',
    width: 150,
    editable: false,
  },
  {
    field: 'Code_Rol',
    headerName: 'Roles',
    width: 150,
    editable: false,
  },
  {
    field: 'Delete',
    headerName: 'Delete',
    width: 200,
    renderCell: (params) => (
      <Button
        variant="contained"
        color="error"
        onClick={() => handleDelete(params.row.Name)} 
      >
        Delete {params.row.Name}
      </Button>
    ),
  },
  {
    field: 'Authorize',
    headerName: 'Authorize',
    width: 200,
    renderCell: (params) => (
      <Button
        variant="contained"
        color="success"
        onClick={() => handleAuthorize(params.row.Name)} 
      >
        Authorize {params.row.Name}
      </Button>
    ),
  }
];
  const requestToken = async (data) => {
      setIsLoading(true);
      setProgress(0);
      let response;
      try {
        response = await await getUsersNotAuthorized(
          (progress) => {setProgress(progress);},Token,"1.0.0"
        );
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
        if (response.length == 0) {
          setIsDataNull(true)
        }else{
            response = response.data;
            renameIdKey(response);
            setIsData(true);
            setResponse(response)
        }
        if (response === false) {
          navigate("/");
        }
      }
  };
  useEffect(() => {
    if (count <= 0) {
      if (!Token) {
        navigate("/Manager/Camper/Home");
      } else {
        requestToken();
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
          {" "}
          user authorization system
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
          in this section you can authorize or delete users who have requested to start using the site.{" "}
        </Typography>

        {isDataNull && (
        <Box className="notData" sx={{ py: { xs: 3, sm: 3, md: 10 } }}>
          <Card sx={{ maxWidth: 345}}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://i.pinimg.com/originals/2f/65/d9/2f65d9234895580bab8eb0bb411a413a.gif"
                  alt="dataNull"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    No incidents have been recorded so far
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  remember that you can create your incidents from the "Create Incidents" option in the drop-down menu or from the button below.
                  </Typography>
                  <Link to={`/Manager/Camper/CreateIncidents`} id="goHome">
                    <Avatar sx={{ bgcolor: "#a976c3" , marginRight: '5px'}}>
                          <PostAddIcon sx={{ color: "#fffef" }} />
                    </Avatar>
                  </Link>
                </CardContent>
              </CardActionArea>
            </Card>
        </Box>
      )}

        {isData && (
           <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={Response}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[5, 10, 25, 50, 100]}
              checkboxSelection
              disableRowSelectionOnClick
            />
         </Box>
        )}
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
