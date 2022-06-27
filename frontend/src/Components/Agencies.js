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
      rowSpacing={4} 
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      {state.agenciesList.map((agency) => {
        function PropertiesDisplay(){
          if(agency.seller_listings.length === 0){
            return <Button disabled size="small">No Property</Button>
          } else if (agency.seller_listings.length === 1){
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
                xs={12} sm={6} md={2}
              >                
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column', marginTop: '1rem' }}
                >
                  <CardMedia
                    component="img"
                    maxHeight="90"
                    sx={{
                      pt: '10.25%',
                    }}
                    image={agency.profile_picture ? agency.profile_picture : defaultProfilePicture}
                    alt="profile picture"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                    {agency.agency_name}
                    </Typography>
                    <Typography>
                    {agency.bio.substring(0, 50)}...
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => navigate(`/agencies/${agency.seller}`)}>View</Button>
                    <Button size="small"> {PropertiesDisplay()}</Button>
                  </CardActions>
                </Card>
              </Grid>              
            );
        })}
    </Grid>
    
  );
}

export default Agencies