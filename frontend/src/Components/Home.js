import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { Button, Typography, Grid } from '@mui/material';
import {makeStyles} from '@mui/styles';
import CustomCard from './CustomCard';
import CssBaseline from '@mui/material/CssBaseline';

const useStyles = makeStyles ({
  divStyle: {
    width: '50%', 
    border: "2px solid red", 
    margin: "15px"
  },
  btnStyle: {
    background: "yellow",

  }
});

function Home() {
  const [btnColor, setBtnColor] = useState("error");
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Grid container>
        <Grid item xs={12} md={6}>
          <CustomCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomCard />
        </Grid>
      </Grid>
    </>
    
  )  
}

export default Home