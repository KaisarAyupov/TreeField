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
	Container,
	FormControlLabel,
	CardActionArea,
    CssBaseline,
    CardActions,
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const useStyles = makeStyles({

});

const theme = createTheme();
function AgencyDetail() {
    const classes = useStyles();
	const navigate = useNavigate();
	const GlobalState = useContext(StateContext);

    const params = useParams();

	const initialState = {
		userProfile: {
			agencyName: "",
			phoneNumber: "",
			profilePic: "",
			bio: "",
			sellerId: "",
			sellerListings: [],
		},
		dataIsLoading: true,
	};

	function ReducerFuction(draft, action) {
		switch (action.type) {
			case "catchUserProfileInfo":
				draft.userProfile.agencyName = action.profileObject.agency_name;
				draft.userProfile.phoneNumber = action.profileObject.phone_number;
				draft.userProfile.profilePic = action.profileObject.profile_picture;
				draft.userProfile.bio = action.profileObject.bio;
				draft.userProfile.sellerListings = action.profileObject.seller_listings;
				draft.userProfile.sellerId = action.profileObject.seller;
				break;

			case "loadingDone":
				draft.dataIsLoading = false;
				break;
		}
	}

	const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

	// request to get profile info
	useEffect(() => {
		async function GetProfileInfo() {
			try {
				const response = await Axios.get(
					`http://localhost:8000/api/profiles/${params.id}/`
				);

				dispatch({
					type: "catchUserProfileInfo",
					profileObject: response.data,
				});
				dispatch({ type: "loadingDone" });
			} catch (e) {}
		}
		GetProfileInfo();
	}, []);
    if (state.dataIsLoading === true) {
		return (
			<Grid
				
			>
				<CircularProgress />
			</Grid>
		);
	}
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <CardActionArea component="a" href="#">
                        <Card sx={{ display: 'flex' }}>
                            <CardContent sx={{ flex: 1 }}>
                                <Typography component="h2" variant="h5">
                                    {state.userProfile.agencyName}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    {state.userProfile.phoneNumber}
                                </Typography>
                                <Typography variant="subtitle1" paragraph>
                                    {state.userProfile.bio}
                                </Typography>
                            </CardContent>
                            <CardMedia
                                component="img"
                                sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                                image={state.userProfile.profilePic !== null
                                    ? state.userProfile.profilePic
                                    : defaultProfilePicture}
                                alt="test"
                            />
                        </Card>
                    </CardActionArea>
                </Grid>
            </Grid>
            
            <Grid
                container
                justifyContent="flex-start"
                spacing={2}
                style={{ padding: "10px" }}
            >
                {state.userProfile.sellerListings.map((listing) => {
                    return (
                        <Grid item xs={12} md={4} key={listing.id}>
                            <CardActionArea component="a" onClick={()=>navigate(`/listings/${listing.id}`)}>
                                <Card sx={{ display: 'flex' }}>
                                    <CardContent sx={{ flex: 1 }}>
                                        <Typography component="h2" variant="h5">
                                            {listing.title}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary">
                                            {listing.description.substring(0, 100)}...
                                        </Typography>
                                        <Typography variant="subtitle1" paragraph>
                                        {listing.property_status === 'Sale' 
                                        ?  `${listing.listing_type} : ${listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` : `${listing.listing_type} :${listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/${listing.rental_frequency}` }
                                        </Typography>
                                    </CardContent>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                                        image={`http://localhost:8000${listing.picture1}` ? `http://localhost:8000${listing.picture1}` : defaultProfilePicture}
                                        onClick={()=>navigate(`/listings/${listing.id}`)}
                                        alt="Listing picture"
                                    />
                                </Card>
                            </CardActionArea>
                        </Grid>
                    );
                })}    
            </Grid>
            </Container>
            

        </ThemeProvider>
        
    )
}

export default AgencyDetail
