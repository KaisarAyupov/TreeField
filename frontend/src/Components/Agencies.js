import React, { useEffect, useState, useRef, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useImmerReducer } from "use-immer";
import { Link as RouterLink } from 'react-router-dom';
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
	CardActionArea,
	Container,
  CardActions
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import { defaultListboxReducer } from "@mui/base";

// Assets
import defaultProfilePicture from "./Assets/defaultProfilePicture.jpg";

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
      <Container sx={{ py: 8 }} maxWidth="md">
        
        <CircularProgress />

      </Container>
      
    );
  }

  return (
    <Grid
      container
      rowSpacing={2}
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {state.agenciesList.map((agency) => {
        function PropertiesDisplay() {
          if (agency.seller_listings.length === 0) {
            return <Button disabled size="small">No Property</Button>
          } else if (agency.seller_listings.length === 1) {
            return <Button size="small" onClick={() => navigate(`/agencies/${agency.seller}`)}>One Property Listed</Button>;
          } else {
            return <Button size="small" onClick={() => navigate(`/agencies/${agency.seller}`)}>{agency.seller_listings.length} Properties</Button>;
          }
        }
        if (agency.agency_name && agency.phone_number)
          return (
            <Grid
              key={agency.id}
              item
              sx={{marginTop: '1rem',}}
              xs={12} sm={4} md={2}
            >
              <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardActionArea component={RouterLink} to={`/agencies/${agency.seller}`}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={agency.profile_picture ? agency.profile_picture : defaultProfilePicture}
                    alt="profile picture"                    
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {agency.agency_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {agency.bio.substring(0, 50)}...
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    {PropertiesDisplay()}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
      })}
    </Grid>
    
  );
}

export default Agencies