import React, { useEffect, useState, useRef, useMemo, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { useImmerReducer } from "use-immer";
// Contexts
import StateContext from "../Contexts/StateContext";

// Assets
import defaultProfilePicture from "./Assets/defaultProfilePicture.jpg";


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
  IconButton,
  CardActions,
  Breadcrumbs,
  Link,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const useStyles = makeStyles({

});

function ListingDetail() {
  const classes = useStyles();
	const navigate = useNavigate();
	const GlobalState = useContext(StateContext);

    const params = useParams();

	const initialState = {
		dataIsLoading: true,
    listingInfo: "",
	};

	function ReducerFuction(draft, action) {
    switch (action.type) {
      case "catchListingInfo":
        draft.listingInfo = action.listingObject;
        break;

      case "loadingDone":
        draft.dataIsLoading = false;
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

  // request to get profile info
  useEffect(() => {
    async function GetListingInfo() {
      try {
        const response = await Axios.get(
          `http://localhost:8000/api/listings/${params.id}/`
        );

        dispatch({
          type: "catchListingInfo",
          listingObject: response.data,
        });
        dispatch({ type: "loadingDone" });
      } catch (e) { }
    }
    GetListingInfo();
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
    <div style={{marginLeft: "2rem", marginRight: "2rem", marginBottom: "2rem"}}>
      <Grid item style={{marginTop: "1rem"}}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link 
            underline="hover" 
            color="inherit" 
            onClick={()=>navigate("/listings")} 
            style={{cursor: "pointer"}}
          >
            Listings
          </Link>
          <Typography color="text.primary">{state.listingInfo.title}</Typography>
        </Breadcrumbs>
      </Grid>
    </div>
  )
}

export default ListingDetail