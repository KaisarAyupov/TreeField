import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import {useImmerReducer} from 'use-immer';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();

function Register() {
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
    password2HelperText: "",
    serverMessageUsername: "",
    serverMessageEmail: "",
    serverMessageSimilarPassword: "",
    serverMessageCommonPassword: "",
    serverMessageNumericPassword: "",
  };
  function ReduserFunction(draft, action) {
    switch (action.type) {
      case 'catchUsernameChange':
        draft.usernameValue = action.usernameChosen;
        draft.usernameErrors.hasErrors = false;
        draft.usernameErrors.errorMessage = "";
        draft.serverMessageUsername = "";
        break;
      case 'catchEmailChange':
        draft.emailValue = action.emailChosen;
        draft.emailErrors.hasErrors = false;
        draft.emailErrors.errorMessage = "";
        draft.serverMessageEmail = "";
        break;
      case 'catchPasswordChange':
        draft.passwordValue = action.passwordChosen;
        draft.passwordErrors.hasErrors = false;
        draft.passwordErrors.errorMessage = "";
        draft.serverMessageSimilarPassword ="";
        draft.serverMessageCommonPassword ="";
        draft.serverMessageNumericPassword ="";
        break;
      case 'catchPassword2Change':
        draft.password2Value = action.password2Chosen;
        if (action.password2Chosen !== draft.passwordValue){
          draft.password2HelperText = "The password mast match";
        }
        else if (action.password2Chosen === draft.passwordValue){
          draft.password2HelperText = ""
        }
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
          draft.usernameErrors.hasErrors = true;
          draft.usernameErrors.errorMessage = "This field must not to be emty!";
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
          draft.emailErrors.hasErrors = true;
          draft.emailErrors.errorMessage = "Please enter a valid email!";
        }
        break;
      case 'catchPasswordErrors':
        if (action.passwordChosen.length < 8){
          draft.passwordErrors.hasErrors = true;
          draft.passwordErrors.errorMessage = "The password must at least have 8 characters!";
        }
        break;
      case 'usernameExists':
        draft.serverMessageUsername = "This username already exists!";
        break;
      case 'emailExists':
        draft.serverMessageEmail = "This email already exists!";
        break;
      case 'similarPassword':
        draft.serverMessageSimilarPassword = "The password is too similar to the username!";
        break;
      case 'commonPassword':
        draft.serverMessageCommonPassword = "This password is too common!";
        break;
      case 'numericPassword':
        draft.serverMessageNumericPassword = "This password is entirely numeric!";
        break;
    }

  }
  const [state, dispatch] = useImmerReducer(ReduserFunction, initialState)

  function FormSubmit(e) {
    e.preventDefault();
    console.log("Test");
    if(!state.usernameErrors.hasErrors && !state.emailErrors.hasErrors && !state.passwordErrors.hasErrors && state.password2HelperText === ''){
      dispatch({ type: 'changeSendRequest' });
      dispatch({type: 'disableTheButton'});
    }
    
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
          if (error.response.data.username){
            dispatch({type: 'usernameExists'})
          }
          else if (error.response.data.email) {
            dispatch({type: 'emailExists'})
          } 
          else if (error.response.data.password[0] === 'The password is too similar to the username.'){
            dispatch({type: 'similarPassword'})
          }
          else if (error.response.data.password[0] === 'This password is too common.'){
            dispatch({type: 'commonPassword'})
          }
          else if (error.response.data.password[0] === 'This password is entirely numeric.'){
            dispatch({type: 'numericPassword'})
          }
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
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1,  bgcolor: "#063970" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={FormSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            {state.serverMessageUsername ? (
              <Alert severity='error'>{state.serverMessageUsername}</Alert>
            ) : (
              ""
            )}

            {state.serverMessageEmail ? (
              <Alert severity='error'>{state.serverMessageEmail}</Alert>
            ) : (
              ""
            )}
            {state.serverMessageSimilarPassword ? (
              <Alert severity='error'>{state.serverMessageSimilarPassword}</Alert>
            ) : (
              ""
            )}
            {state.serverMessageCommonPassword ? (
              <Alert severity='error'>{state.serverMessageCommonPassword}</Alert>
            ) : (
              ""
            )}
            {state.serverMessageNumericPassword ? (
              <Alert severity='error'>{state.serverMessageNumericPassword}</Alert>
            ) : (
              ""
            )}
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                  value={state.usernameValue}
                  onChange={(e) =>
                    dispatch({
                      type: 'catchUsernameChange',
                      usernameChosen: e.target.value,
                    })
                  }
                  onBlur={(e) =>
                    dispatch({
                      type: 'catchUsernameErrors',
                      usernameChosen: e.target.value,
                    })
                  }
                  error={state.usernameErrors.hasErrors ? true : false}
                  helperText={state.usernameErrors.errorMessage}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={state.passwordValue}
                  onChange={(e) =>
                    dispatch({
                      type: 'catchPasswordChange',
                      passwordChosen: e.target.value
                    })
                  }
                  onBlur={(e) =>
                    dispatch({
                      type: 'catchPasswordErrors',
                      passwordChosen: e.target.value
                    })
                  }
                  error={state.passwordErrors.hasErrors ? true : false}
                  helperText={state.passwordErrors.errorMessage}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="Confirm Password"
                  type="password"
                  id="password2"
                  value={state.password2Value}
                  onChange={(e) =>
                    dispatch({
                      type: 'catchPassword2Change',
                      password2Chosen: e.target.value
                    })
                  }
                  helperText={state.password2HelperText}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link 
                 variant="body2"
                 onClick={() => navigate("/login")}
                 style={{ cursor: 'pointer'}}
                 >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Snackbar
            open={state.openSnack}
            message="You have successfully created accaunt!"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          /> 
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Register