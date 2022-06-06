import React, { useEffect, useState, useRef, useMemo, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { useImmerReducer } from "use-immer";
// Contexts
import StateContext from "../Contexts/StateContext";

// Assets
import defaultProfilePicture from "./Assets/defaultProfilePicture.jpg";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';


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
  SliderContainer: {
    position: "relative",
    marginTop: "1rem",
  },
  leftArrow: {
    position: "absolute",
    cursor: "pointer",
    fontSize: "3rem",
    color: "white",
    top: "50%",
    left: "27.5%",
    "&:hover": {
      backgroundColor: "green"
    },
  },
  rightArraw: {
    position: "absolute",
    cursor: "pointer",
    fontSize: "3rem",
    color: "white",
    top: "50%",
    right: "27.5%",
    "&:hover": {
      backgroundColor: "green"
    },
  },

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

  const listingPictures = [
    state.listingInfo.picture1,
    state.listingInfo.picture2,
    state.listingInfo.picture3,
    state.listingInfo.picture4,
    state.listingInfo.picture5,
  ].filter((picture)=> picture !== null);

  const [currentPicture, setCurrentPicture] = useState(0)

  function NextPicture(){
    if (currentPicture === listingPictures.length - 1){
      return setCurrentPicture(0)
    } else {
      return setCurrentPicture(currentPicture + 1);
    }    
  }
  function PreviousPicture(){
    if (currentPicture === 0){
      return setCurrentPicture(listingPictures.length - 1)
    } else {
      return setCurrentPicture(currentPicture - 1);
    } 
  }


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
      {/* Image slider */}
      {listingPictures.length > 0 ? (
        <Grid item container justifyContent='center' className={classes.SliderContainer}>
          {listingPictures.map((picture, index) => {
            return (
              <div key={index}>
                {index === currentPicture ? (
                  <img
                    src={picture}
                    style={{ width: "45rem", height: "35rem" }}
                  />
                ) : (
                  ""
                )}
              </div>
            )
          })}
          <ArrowCircleLeftIcon onClick={PreviousPicture} className={classes.leftArrow}/>
          <ArrowCircleRightIcon onClick={NextPicture} className={classes.rightArraw}/>
        </Grid>
      ) : ("")}
    </div>
  );
}

export default ListingDetail