import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
// MUI
import { Grid, AppBar, Typography, Button, Card, CardHeader, CardMedia, CardContent, CircularProgress, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';


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
    const navigate = useNavigate();
    const [sendRequest, setSendRequest] = useState(false);

    function FormSubmit(e){
      e.preventDefault();
      console.log("Test");
      setSendRequest(!sendRequest)
      
    }
    useEffect(() => {
      if (sendRequest) {
        const source = Axios.CancelToken.source();
        async function SignUp() {
          try {
            const response = await Axios.post(
              "http://localhost:8000/api-auth-djoser/users/",
              {
                username: "testinguser",
                email: "testinguser@gmail.com",
                password: "mypass123",
                re_password: "mypass123",
              },
              {
                cancelToken: source.token
              }
            );
            console.log(response)          
          } catch (error) {
            console.log(error);
          }
        }
        SignUp();
        return () => {
          source.cancel();
        };
      }
    }, [sendRequest])
  return (
    <div className={classes.formConteiner}>
        <form onSubmit={FormSubmit}>
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
                  <Typography variant='small' style={{ marginTop: '1rem' }}>Already have an account!
                      <span
                          onClick={() => navigate("/login")} style={{ cursor: 'pointer', color: 'green' }}>SIGN IN
                      </span>
                  </Typography>
            </Grid>  
        </form>
    </div>
  )
}

export default Register