import React, { useState, useContext, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Axios from "axios";
// MUI
import { Button, Typography, Grid, AppBar, Toolbar, Menu, MenuItem, Snackbar, useTheme, useMediaQuery, Tab, Tabs, Tooltip, IconButton, Avatar} from '@mui/material';
import {makeStyles} from '@mui/styles';
import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
import DrawerComp from "./Drawer";
import MapIcon from '@mui/icons-material/Map';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
// Contexts
import StateContext from '../Contexts/StateContext';
import DispatchContext from '../Contexts/DispatchContext';

// Components
import CustomCard from './CustomCard';
// Assets
import defaultProfilePicture from "./Assets/defaultProfilePicture.jpg";


const useStyles = makeStyles ({
  lefNav: {
    marginRight: "auto",
  },
  
  rightNav: {
    marginLeft: "auto",
    marginRight: "10rem",
  },
  propertyBtn: {
    backgroundColor: "green",
    color: "white",
    width: "15rem",
    fontSize: "1.1rem",
    marginRight: "1rem",
    '&:hover': {
      backgroundColor: "blue"
    }
  },
  loginBtn: {
    backgroundColor: "white",
    color: "black",
    width: "15rem",
    fontSize: "1.1rem",
    marginLeft: "1rem",
    '&:hover': {
      backgroundColor: "green"
    }
  }, 
  profileBtn: {
    color: 'black',
    backgroundColor: "green",
    width: "15rem",
    fontWeight: 'bolder',
    borderRadius: "15px",
    marginBottom: "0.25rem"
  },
  logoutBtn: {
    color: 'red',
    backgroundColor: "green",
    width: "15rem",
    fontWeight: 'bolder',
    borderRadius: "15px"
  },


});

const  Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const GlobalState = useContext(StateContext);
  const GlobalDispatch = useContext(DispatchContext);
  const [value, setValue] = useState();
  const theme = useTheme();
  console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  console.log(isMatch);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
      setAnchorEl(null);
  };

  function HandleProfile(){
    setAnchorEl(null);
      navigate("/profile");
  }

  const [openSnack, setOpenSnack] = useState(false)

  async function HandleLogout() {
    setAnchorEl(null);
    const confirmLogout = window.confirm("Are you sure you want to leave?");
    if (confirmLogout) {
      try {
        const response = await Axios.post(
          "http://localhost:8000/api-auth-djoser/token/logout/",
          GlobalState.userToken,
          { headers: { Authorization: "Token ".concat(GlobalState.userToken) } }
        );
        console.log(response)
        GlobalDispatch({ type: "logout" });
        setOpenSnack(true)
      } catch (e) {
        console.log(e.response)
      }
    }
  }
  useEffect(()=>{
    if (openSnack){
      setTimeout(()=>{
        navigate(0)
      }, 1500)
    }
  }, [openSnack]);
  return (
    <React.Fragment>
      <AppBar position="static" sx={{ background: "#063970" }}>
        <Toolbar>
        <AddBusinessRoundedIcon sx={{ transform: "scale(2)" }} />
          {isMatch ? (
            <>
              <Typography sx={{ fontSize: "2rem", paddingLeft: "10%" }} onClick={() => navigate('/')}>
                UKO
              </Typography >
              <DrawerComp />
            </>
          ) : (
            <>
              <Tabs
                style={{ paddingLeft: "5%", marginRight: "auto" }}
                indicatorColor="secondary"
                textColor="inherit"
                aria-label="icon label tabs example"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                <Tab icon={<MapIcon />} label="Maps" onClick={() => navigate('/listings')}/>
                
                <Tab icon={<LocalShippingIcon />} label="Company" onClick={() => navigate('/agencies')}/>
                <Tab icon={<ContactPageIcon />} label="Contact" />
              </Tabs>
              <Button 
              sx={{ marginLeft: "auto", marginRight: "10px" }} 
              color="success"
              variant="contained"
              startIcon={<AddLocationAltIcon />}
              onClick={() => navigate('/addproperty')}              
              >
                Add Property
              </Button>
              {GlobalState.userIsLogged ? (
              
              <Tooltip title="Open settings">
                    <IconButton onClick={handleClick} sx={{ p: 0 , textTransform: "uppercase"}}>
                      <Avatar alt="avatar">
                        {GlobalState.userUsername ? GlobalState.userUsername.charAt(0) : defaultProfilePicture}
                      </Avatar>
                    </IconButton>
            </Tooltip>
              
            ) : (
              <Button
                sx={{ marginLeft: "10px" }} 
                variant="contained"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>)}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={HandleProfile}>Profile</MenuItem>
              <MenuItem onClick={HandleLogout}>Logout</MenuItem>
            </Menu>            
            </>
          )}
          <Snackbar
              open={openSnack}
              message="You have successfully logged iout!"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
            />    
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Header