import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ListItemIcon from '@mui/material/ListItemIcon';
import AdbIcon from '@mui/icons-material/Adb';
import Snackbar from '@mui/material/Snackbar';
import {Link, useNavigate} from 'react-router-dom'
import React, { useState, useContext, useEffect } from 'react'
import Axios from "axios";
import {makeStyles} from '@mui/styles';

//Icons
import MapIcon from '@mui/icons-material/Map';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import Logout from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
// Contexts
import StateContext from '../Contexts/StateContext';
import DispatchContext from '../Contexts/DispatchContext';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
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

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const GlobalState = useContext(StateContext);
  const GlobalDispatch = useContext(DispatchContext);
  const [value, setValue] = useState();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  }; 

  function HandleProfile(){
    setAnchorElUser(null);
      navigate("/profile");
  }  

  const [openSnack, setOpenSnack] = useState(false)

  async function HandleLogout() {
    setAnchorEl(null);
    setAnchorElUser(null);
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
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO M
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
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
                <Tab icon={<ContactPageIcon />} label="Contact" onClick={() => navigate('/contact')}/>
              </Tabs>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {GlobalState.userIsLogged ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, textTransform: "uppercase" }}>
                  <Avatar alt="avatar">
                    {GlobalState.userUsername.charAt(0)}
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
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={HandleProfile}>
                    <ListItemIcon>
                      <ManageAccountsIcon fontSize="small" />
                    </ListItemIcon>
                   My account
                  </MenuItem>
                  <MenuItem onClick={HandleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                     </ListItemIcon>
                    Logout
                  </MenuItem>
            </Menu>
          </Box>
          <Snackbar
            open={openSnack}
            message="You have successfully logged iout!"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;