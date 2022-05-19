import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { Button, Typography } from '@mui/material';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles ({
    divStyle: {
      width: '100%', 
      border: "2px solid red", 
      padding: "15px"
    },
    btnStyle: {
      background: "yellow",
  
    }
  });

function CustomCard() {
    const [btnColor, setBtnColor] = useState("error");
    const classes = useStyles();
  return (
    <div className={classes.divStyle}>
        <Typography align='riht' variant='h4'>  This is the Title </Typography>
        <Typography align='justify' variant='body1'>  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </Typography>

        <Button 
        onClick={()=>setBtnColor("success")} 
        className={classes.btnStyle}
        size="large" 
        variant="contained"
        >
          Go
        </Button>

        </div>
  )
}

export default CustomCard