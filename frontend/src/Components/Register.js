import React from 'react'
import Axios from "axios";
// react-leaflet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet';
// MUI
import { Grid, AppBar, Typography, Button, Card, CardHeader, CardMedia, CardContent, CircularProgress, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { border, padding } from '@mui/system';


const useStyles = makeStyles({
    formConteiner: {
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '3rem',
        border: '5px solid black',
        padding: '3rem',
    },
    registerBtn: {
        backgroundColor: "orange",
        color: "white",
        fontSize: "1.1rem",
        marginLeft: "1rem",
        '&:hover': {
          backgroundColor: "green"
        }
      },
      
  });

function Register() {
    const classes = useStyles();
  return (
    <div className={classes.formConteiner}>
        <form>
            <Grid item container style={{ marginTop: '1rem'}}>
            <Typography variant='h4'>CREATE AN ACCOUNT</Typography>
            </Grid>
            <Grid item container style={{ marginTop: '1rem'}}>
            <TextField id="username" label="Username" variant="outlined" fullWidth/>
            </Grid>
            <Grid item container style={{ marginTop: '1rem'}}>
            <TextField id="email" label="Email" variant="outlined" fullWidth/>
            </Grid>
            <Grid item container style={{ marginTop: '1rem'}}>
            <TextField id="password" label="Password" variant="outlined" fullWidth type="password"/>
            </Grid>
            <Grid item container style={{ marginTop: '1rem'}}>
            <TextField id="password2" label="Confirm Password" variant="outlined" fullWidth type="password"/>
            </Grid>  
            <Grid item container xs={8} style={{ marginTop: '1rem', marginLeft: "auto", marginRight: "auto"}}>
            <Button  variant="contained" fullWidth type="submit" className={classes.registerBtn} >SIGN UP</Button>
            </Grid>
            <Grid item container justifyContent="center" style={{ marginTop: '1rem'}}>
            <Typography variant='small' style={{ marginTop: '1rem'}}>Already have an account! <span style={{ cursor: 'pointer', color: 'green'}}>SIGN IN</span></Typography>
            </Grid>  
        </form>
    </div>
  )
}

export default Register