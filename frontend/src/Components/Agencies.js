import React, { useEffect, useState, useRef, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useImmerReducer } from "use-immer";

// Contexts
import StateContext from "../Contexts/StateContext";

// MUI
import {
	Grid,
	AppBar,
	Typography,
	Button,
	Card,
	CardHeader,
	CardMedia,
	CardContent,
	CircularProgress,
	TextField,
	FormControlLabel,
	Checkbox,
	Snackbar,
} from "@mui/material";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
	
});

function Agencies() {
  const classes = useStyles();
	const navigate = useNavigate();
	const GlobalState = useContext(StateContext);

	const initialState = {
    dataIsLoading: true,
    agenciesList: [],
		
	};

	function ReducerFuction(draft, action) {
		switch (action.type) {
      case 'catchAgencies':
        draft.agenciesList = action.agenciesArray;
        break;
      case 'loadingDone':
        draft.dataIsLoading = false;
        break;        
    }
	}

	const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);
  // request to get all profiles
	useEffect(() => {
		async function GetAgencies() {
			try {
				const response = await Axios.get('http://127.0.0.1:8000/api/profiles/');
        console.log(response.data)
				dispatch({
					type: "catchAgencies",
					agenciesArray: response.data,
				});
				dispatch({ type: "loadingDone" });
			} catch (e) {
        console.log(e.response)
      }
		}
		GetAgencies();
	}, []);
  if (state.dataIsLoading === true) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <div 
      {state.agenciesList.map((agency) => {
        if (agency.agency_name && agency.phone_number)
          return (
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          );
      })}>
    </div>
  )
}

export default Agencies