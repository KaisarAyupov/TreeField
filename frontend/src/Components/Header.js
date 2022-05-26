import React, { useState, useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'

// MUI
import { Button, Typography, Grid, AppBar, Toolbar, Menu, MenuItem } from '@mui/material';
import {makeStyles} from '@mui/styles';

// Contexts
import StateContext from '../Contexts/StateContext';

// Components
import CustomCard from './CustomCard';



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

function Header() {
    const classes = useStyles();
    const navigate = useNavigate();
    const GlobalState = useContext(StateContext);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  return (
    <AppBar position="static" style={{backgroundColor: "black"}}>
        <Toolbar>
          <div className={classes.lefNav}>
            <Button color="inherit" onClick={()=>navigate('/')}> 
             <Typography variant='h4'>TreeUI</Typography>
            </Button>
          </div>
          <div>
            <Button color="inherit" onClick={()=>navigate('/listings')} style={{marginRight: '2rem'}}>
              <Typography variant='h6'>Listings</Typography>
            </Button>
            <Button color="inherit" style={{marginLeft: '2rem'}}>
              <Typography variant='h6'>Agencies</Typography>
            </Button>
          </div>
          <div className={classes.rightNav}>
            <Button className={classes.propertyBtn}>Add Property</Button>
            {GlobalState.userIsLogged ? (
              <Button
                className={classes.loginBtn}
                onClick={handleClick}                
              // onClick={()=>navigate('/login')}
              >
                {GlobalState.userUsername}
              </Button>
            ) : (
              <Button
                className={classes.loginBtn}
                onClick={() => navigate('/login')}
              >
                Login
              </Button>)}
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem className={classes.profileBtn} onClick={handleClose}>Profile</MenuItem>
                <MenuItem className={classes.logoutBtn} onClick={handleClose}>Logout</MenuItem>
              </Menu>
            
          </div>
        </Toolbar>
      </AppBar>
  )
}

export default Header