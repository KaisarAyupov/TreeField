import React, {useEffect, useContext} from 'react'
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import {useImmerReducer} from 'use-immer';

// MUI
import { Grid, AppBar, Typography, Button, Card, CardHeader, CardMedia, CardContent, CircularProgress, TextField, Snackbar} from '@mui/material';
import { makeStyles } from '@mui/styles';

// Contexts
import DispatchContext from '../Contexts/DispatchContext';
import StateContext from '../Contexts/StateContext';

const useStyles = makeStyles({
    formConteiner: {
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '3rem',
        border: '5px solid black',
        padding: '3rem',
    },
    loginBtn: {
        backgroundColor: "orange",
        color: "white",
        fontSize: "1.1rem",
        marginLeft: "1rem",
        '&:hover': {
          backgroundColor: "green"
        }
      },
      
  });



function Login() {
    const classes = useStyles();
    const navigate = useNavigate();

    const GlobalDispatch = useContext(DispatchContext)
    const GlobalState = useContext(StateContext)

    const initialState = {
      usernameValue: "",
      passwordValue: "",
      sendRequest: 0,
      token: "",
      openSnack: false,
      disabledBtn: false,
      
    };
    function ReduserFunction(draft, action) {
      switch (action.type) {
        case 'catchUsernameChange':
          draft.usernameValue = action.usernameChosen;
          break;
        case 'catchPasswordChange':
          draft.passwordValue = action.passwordChosen;
          break;
        case 'changeSendRequest':
          draft.sendRequest = draft.sendRequest +1;
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
      }

    }
    const [state, dispatch] = useImmerReducer(ReduserFunction, initialState)

    function FormSubmit(e){
      e.preventDefault();
      console.log("Test");
      dispatch({type: 'changeSendRequest'});
      dispatch({type: 'disableTheButton'})      
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
                cancelToken: source.token
              }
            );
            console.log(response)
            dispatch({
              type: 'catchToken', 
              tokenValue: response.data.auth_token
            });
            GlobalDispatch({
              type: 'catchToken', 
              tokenValue: response.data.auth_token
            });
            //navigate('/')          
          } catch (error) {
            console.log(error);
            dispatch({type: 'allowTheButton'})
          }
        }
        SignIn();
        return () => {
          source.cancel();
        };
      }
    }, [state.sendRequest])   
    
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
          console.log(response)
          GlobalDispatch({
            type: "userSignsIn",
            usernameInfo: response.data.username,
            emailInfo: response.data.email,
            idInfo: response.data.id
          })
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
            <Typography variant='h4'>SIGN IN</Typography>
            </Grid>
            <Grid item container style={{ marginTop: '1rem'}}>
            <TextField 
              id="username" 
              label="Username" 
              variant="outlined" 
              fullWidth
              value={state.usernameValue} 
              onChange = {(e)=>dispatch({type: 'catchUsernameChange', usernameChosen: e.target.value})}
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
              onChange = {(e)=>dispatch({type: 'catchPasswordChange', passwordChosen: e.target.value})}
            />
            </Grid>
            <Grid item container xs={8} style={{ marginTop: '1rem', marginLeft: "auto", marginRight: "auto"}}>
            <Button  
              variant="contained" 
              fullWidth type="submit" 
              className={classes.registerBtn}
              disabled= {state.disabledBtn}
            >
              SIGN IN
            </Button>
            </Grid>              
        </form>
        
        <Grid item container justifyContent="center" style={{ marginTop: '1rem'}}>
          <Typography variant='small'  style={{ marginTop: '1rem'}}>Dont have an account yet? <span onClick={()=> navigate("/register")} style={{ cursor: 'pointer', color: 'green'}}>SIGN UP</span></Typography>
        </Grid>
        <Snackbar
          open={state.openSnack}
          message="You hav successfully logged in!"
          anchorOrigin = {{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        />
    </div>
  )
}

export default Login