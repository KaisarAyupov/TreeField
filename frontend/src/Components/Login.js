import React, {useEffect, useContext} from 'react'
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import {useImmerReducer} from 'use-immer';

// MUI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// Contexts
import DispatchContext from '../Contexts/DispatchContext';


const theme = createTheme();
function Login() {
  const navigate = useNavigate();
  const GlobalDispatch = useContext(DispatchContext)
  const initialState = {
    usernameValue: "",
    passwordValue: "",
    sendRequest: 0,
    token: "",
    openSnack: false,
    disabledBtn: false,
    serverError: false,
  };
  function ReduserFunction(draft, action) {
    switch (action.type) {
      case 'catchUsernameChange':
        draft.usernameValue = action.usernameChosen;
        draft.serverError = false;
        break;
      case 'catchPasswordChange':
        draft.passwordValue = action.passwordChosen;
        draft.serverError = false;
        break;
      case 'changeSendRequest':
        draft.sendRequest = draft.sendRequest + 1;
        break;
      case 'catchToken':
        draft.token = action.tokenValue
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
      case 'catchServerError':
        draft.serverError = true;
    }

  }
  const [state, dispatch] = useImmerReducer(ReduserFunction, initialState)

  function FormSubmit(e) {
    e.preventDefault();
    console.log("Test");
    dispatch({ type: 'changeSendRequest' });
    dispatch({ type: 'disableTheButton' });
  }
  useEffect(() => {
    if (state.sendRequest) {
      const source = Axios.CancelToken.source();
      async function SignIn() {
        try {
          const response = await Axios.post(
            "http://localhost:8000/api-auth-djoser/token/login/",
            {
              username: state.usernameValue,
              password: state.passwordValue,
            },
            {
              cancelToken: source.token,
            }
          );
          console.log(response)
          dispatch({
            type: 'catchToken',
            tokenValue: response.data.auth_token,
          });
          GlobalDispatch({
            type: 'catchToken',
            tokenValue: response.data.auth_token,
          });
          //navigate('/')          
        } catch (error) {
          console.log(error);
          dispatch({ type: 'allowTheButton' });
          dispatch({ type: 'catchServerError'})
        }
      }
      SignIn();
      return () => {
        source.cancel();
      };
    }
  }, [state.sendRequest]);

  // get User info
  useEffect(() => {
    if (state.token !== '') {
      const source = Axios.CancelToken.source();
      async function GetUserInfo() {
        try {
          const response = await Axios.get(
            "http://localhost:8000/api-auth-djoser/users/me/",
            {
              headers: { Authorization: "Token ".concat(state.token) },
            },
            {
              cancelToken: source.token
            }
          );
          console.log(response);
          GlobalDispatch({
            type: "userSignsIn",
            usernameInfo: response.data.username,
            emailInfo: response.data.email,
            idInfo: response.data.id,
          });
          dispatch({ type: "openTheSnack" });
        } catch (error) {
          console.log(error);
        }
      }
      GetUserInfo();
      return () => {
        source.cancel();
      };
    }
  }, [state.token])

  useEffect(() => {
    if (state.openSnack) {
      setTimeout(() => {
        navigate("/")
      }, 2000)
    }
  }, [state.openSnack]);
  

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
          <Avatar sx={{ m: 1, bgcolor: "#063970" }}>
            <LoginIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          ?????????? ?? ??????????????
          </Typography>
          {state.serverError ? (
          <Alert severity="error">???????????????????????? ?????? ???????????????????????? ?????? ????????????!</Alert>
        ) : (
          ""
        )}
          <Box component="form" onSubmit={FormSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="?????? ????????????????????????"
              name="username"
              value={state.usernameValue}
              autoComplete="username"
              autoFocus
              onChange={(e) => 
                dispatch({ 
                  type: 'catchUsernameChange', 
                  usernameChosen: e.target.value,
                })
              }
              error = {state.serverError ? true : false}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="????????????"
              type="password"
              id="password"
              value={state.passwordValue}
              onChange={(e) =>
                dispatch({
                  type: 'catchPasswordChange',
                  passwordChosen: e.target.value
                })
              }
              error={state.serverError ? true : false}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="?????????????????? ????????!"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ?????????? ?? ??????????????
            </Button>
            <Grid container>
              <Grid item>
                <Link 
                onClick={() => navigate("/register")} 
                variant="body2"
                sx={{ cursor: 'pointer'}}
                >
                  {"?????? ???? ?????????????????????????????????"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Snackbar
            severity="success"
            open={state.openSnack}
            message="???? ?????????????? ?????????? ?? ???????? ??????????????!"
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
export default Login