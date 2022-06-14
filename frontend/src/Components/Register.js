import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import {useImmerReducer} from 'use-immer';
// MUI
import { Grid, AppBar, Typography, Button, Card, CardHeader, CardMedia, CardContent, CircularProgress, TextField, Snackbar } from '@mui/material';
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

  const initialState = {
    usernameValue: "",
    emailValue: "",
    passwordValue: "",
    password2Value: "",
    sendRequest: 0,
    openSnack: false,
    disabledBtn: false,
    usernameErrors: {
      hasErrors: false,
      errorMessage: "",
    },
    emailErrors: {
      hasErrors: false,
      errorMessage: "",
    },
    passwordErrors: {
      hasErrors: false,
      errorMessage: "",
    },
  };
  function ReduserFunction(draft, action) {
    switch (action.type) {
      case 'catchUsernameChange':
        draft.usernameValue = action.usernameChosen;
        draft.usernameErrors.hasErrors = false;
        draft.usernameErrors.errorMessage = "";
        break;
      case 'catchEmailChange':
        draft.emailValue = action.emailChosen;
        draft.emailErrors.hasErrors = false;
        draft.emailErrors.errorMessage = "";
        break;
      case 'catchPasswordChange':
        draft.passwordValue = action.passwordChosen;
        draft.passwordErrors.hasErrors = false;
        draft.passwordErrors.errorMessage = "";
        break;
      case 'catchPassword2Change':
        draft.password2Value = action.password2Chosen;
        break;
      case 'changeSendRequest':
        draft.sendRequest = draft.sendRequest + 1;
        break;
      case 'openTheSnack':
        draft.openSnack = true;
        break;
      case 'disableTheButton':
        draft.disabledBtn = true;
        break;
      case 'allowTheButton':
        draft.disabled = false;
        break;
      case 'catchUsernameErrors':
        if (action.usernameChosen.length === 0){
          draft.usernameErrors.hasErrors = true
          draft.usernameErrors.errorMessage = "This field must not to be emty!"
        }
        else if (action.usernameChosen.length < 5) {
          draft.usernameErrors.hasErrors = true
          draft.usernameErrors.errorMessage = "The user name must have at least mpore than five characters!"
        }
        else if (!/^([a-zA-Z0-9]+)$/.test(action.usernameChosen)){
          draft.usernameErrors.hasErrors = true
          draft.usernameErrors.errorMessage = "This field must not have special characters!"
        }
        break;
      case 'catchEmailErrors':
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(action.emailChosen)){
          draft.emailErrors.hasErrors = true
          draft.emailErrors.errorMessage = "Please enter a valid email!"
        }
        break;
      case 'catchPasswordErrors':
        if (action.passwordChosen.length < 8){
          draft.passwordErrors.hasErrors = true
          draft.passwordErrors.errorMessage = "The password must at least have 8 characters!"
        }
        break;
    }

  }
  const [state, dispatch] = useImmerReducer(ReduserFunction, initialState)

  function FormSubmit(e) {
    e.preventDefault();
    console.log("Test");
    dispatch({ type: 'changeSendRequest' });
    dispatch({type: 'disableTheButton'});
  }
  useEffect(() => {
    if (state.sendRequest) {
      const source = Axios.CancelToken.source();
      async function SignUp() {
        try {
          const response = await Axios.post(
            "http://localhost:8000/api-auth-djoser/users/",
            {
              username: state.usernameValue,
              email: state.emailValue,
              password: state.passwordValue,
              re_password: state.password2Value,
            },
            {
              cancelToken: source.token
            }
          );
          console.log(response)
          dispatch({ type: "openTheSnack" });
        } catch (error) {
          dispatch({type: 'allowTheButton'})
          console.log(error);
        }
      }
      SignUp();
      return () => {
        source.cancel();
      };
    }
  }, [state.sendRequest])
  useEffect(()=>{
    if (state.openSnack){
      setTimeout(()=>{
        navigate("/")
      }, 1500)
    }
  }, [state.openSnack])
  return (
    <div className={classes.formConteiner}>
        <form onSubmit={FormSubmit}>
            <Grid item container style={{ marginTop: '1rem'}}>
            <Typography variant='h4'>CREATE AN ACCOUNT</Typography>
            </Grid>
            <Grid item container style={{ marginTop: '1rem'}}>
            <TextField 
              id="username" 
              label="Username" 
              variant="outlined" 
              fullWidth
              value={state.usernameValue} 
              onChange = {(e)=>
                dispatch({
                  type: 'catchUsernameChange', 
                  usernameChosen: e.target.value,
                })
              }
              onBlur = {(e)=>
                dispatch({
                  type: 'catchUsernameErrors', 
                  usernameChosen: e.target.value,
                })
              }
              error = {state.usernameErrors.hasErrors ? true : false}
              helperText = {state.usernameErrors.errorMessage}
            />
            </Grid>
            <Grid item container style={{ marginTop: '1rem'}}>
            <TextField 
              id="email"
              label="Email"
              variant="outlined"
              fullWidth
              value={state.emailValue} 
              onChange = {(e)=>
                dispatch({
                  type: 'catchEmailChange', 
                  emailChosen: e.target.value
                })
              }
              onBlur = {(e)=>
                dispatch({
                  type: 'catchEmailErrors', 
                  emailChosen: e.target.value
                })
              }
              error = {state.emailErrors.hasErrors ? true : false}
              helperText = {state.emailErrors.errorMessage}               
            />
            </Grid>
            <Grid item container style={{ marginTop: '1rem'}}>
            <TextField 
              id="password" 
              label="Password" 
              variant="outlined" 
              fullWidth 
              type="password"
              value={state.passwordValue} 
              onChange = {(e)=>
                dispatch({
                  type: 'catchPasswordChange', 
                  passwordChosen: e.target.value
                })
              }
              onBlur = {(e)=>
                dispatch({
                  type: 'catchPasswordErrors', 
                  passwordChosen: e.target.value
                })
              }
              error = {state.passwordErrors.hasErrors ? true : false}
              helperText = {state.passwordErrors.errorMessage}  
            />
            </Grid>
            <Grid item container style={{ marginTop: '1rem'}}>
            <TextField 
              id="password2" 
              label="Confirm Password" 
              variant="outlined" 
              fullWidth 
              type="password"
              value={state.password2Value} 
              onChange = {(e)=>dispatch({type: 'catchPassword2Change', password2Chosen: e.target.value})}
            />
            </Grid>  
            <Grid item container xs={8} style={{ marginTop: '1rem', marginLeft: "auto", marginRight: "auto"}}>
            <Button  
              variant="contained" 
              fullWidth type="submit" 
              className={classes.registerBtn} 
              disabled= {state.disabledBtn}
            >
              SIGN UP
            </Button>
            </Grid>
          </form>
          <Grid item container justifyContent="center" style={{ marginTop: '1rem' }}>
            <Typography variant='small' style={{ marginTop: '1rem' }}>Already have an account!
              <span
                onClick={() => navigate("/login")} style={{ cursor: 'pointer', color: 'green' }}>SIGN IN
              </span>
            </Typography>
          </Grid>
          <Snackbar
            open={state.openSnack}
            message="You have successfully created accaunt!"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          />       
    </div>
  )
}

export default Register