import React, { useEffect, useState, useRef, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useImmerReducer } from "use-immer";
// Contexts
import StateContext from "../Contexts/StateContext";

// Assets
import defaultProfilePicture from "./Assets/defaultProfilePicture.jpg";

// Components
import ProfileUpdate from "./ProfileUpdate";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ManageAccountsTwoToneIcon from '@mui/icons-material/ManageAccountsTwoTone';
import PersonPinIcon from '@mui/icons-material/PersonPin';
// MUI
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {
	Grid,
	Container,
	Typography,
	Button,
	Avatar,
	CardHeader,
	CardMedia,
	CardContent,
	CircularProgress,
	styled,
	FormControlLabel,
	Checkbox,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
const ImgStyled = styled('img')(({ theme }) => ({
	width: 120,
	height: 120,
	marginRight: theme.spacing(6.25),
	borderRadius: theme.shape.borderRadius
  }))

const useStyles = makeStyles({
	formContainer: {
		width: "50%",
		marginLeft: "auto",
		marginRight: "auto",
		marginTop: "3rem",
		border: "5px solid black",
		padding: "3rem",
	},
	loginBtn: {
		backgroundColor: "green",
		color: "white",
		fontSize: "1.1rem",
		marginLeft: "1rem",
		"&:hover": {
			backgroundColor: "blue",
		},
	},
	picturesBtn: {
		backgroundColor: "blue",
		color: "white",
		fontSize: "0.8rem",
		border: "1px solid black",
		marginLeft: "1rem",
	},
});
function TabPanel(props) {
	const { children, value, index, ...other } = props;
  
	return (
	  <div
		role="tabpanel"
		hidden={value !== index}
		id={`simple-tabpanel-${index}`}
		aria-labelledby={`simple-tab-${index}`}
		{...other}
	  >
		{value === index && (
		  <Box sx={{ p: 3 }}>
			<Typography>{children}</Typography>
		  </Box>
		)}
	  </div>
	);
  }

  TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
  };
  function a11yProps(index) {
	return {
	  id: `simple-tab-${index}`,
	  'aria-controls': `simple-tabpanel-${index}`,
	};
  }
function Profile() {
	const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
	const classes = useStyles();
	const navigate = useNavigate();
	const GlobalState = useContext(StateContext);

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
					`http://localhost:8000/api/profiles/${GlobalState.userId}/`
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

	function PropertiesDisplay() {
		if (state.userProfile.sellerListings.length === 0) {
			return (
				<Button
					onClick={() => navigate(`/agencies/${state.userProfile.sellerId}`)}
					disabled
					size="small"
				>
					No Property
				</Button>
			);
		} else if (state.userProfile.sellerListings.length === 1) {
			return (
				<Button
					onClick={() => navigate(`/agencies/${state.userProfile.sellerId}`)}
					size="small"
				>
					One Property listed
				</Button>
			);
		} else {
			return (
				<Button
					onClick={() => navigate(`/agencies/${state.userProfile.sellerId}`)}
					size="small"
				>
					{state.userProfile.sellerListings.length} Properties
				</Button>
			);
		}
	}

	function WelcomeDisplay() {
		if (
			state.userProfile.agencyName === null ||
			state.userProfile.agencyName === "" ||
			state.userProfile.phoneNumber === null ||
			state.userProfile.phoneNumber === ""
		) {
			return (
				
				<Typography
					variant="h5"
					style={{ textAlign: "center", marginTop: "1rem" }}
				>
					Agent name:{" "}
					<span style={{ color: "green", fontWeight: "bolder" }}>
						{GlobalState.userUsername}
					</span>{" "}
					, please submit this form below to update your profile.
				</Typography>
			);
		} else {
			return (
				<Grid container spacing={3}>
					<Grid item container sx={{ marginBottom: '1rem' }}>
						<Typography variant="h4">PROFILE INFO</Typography>
					</Grid>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<ImgStyled src={
									state.userProfile.profilePic !== null
										? state.userProfile.profilePic
										: defaultProfilePicture
								} alt='Profile Pic' />
								<Box>
									<Grid item xs={12}>
										<Typography component="h2" variant="h5">
											Agent name:{" "}
											<span style={{ color: "green", fontWeight: "bolder" }}>
												{GlobalState.userUsername}
											</span>
										</Typography>
										<Typography variant="subtitle1" color="text.secondary">
											You have {PropertiesDisplay()}
										</Typography>
										<Typography variant='body2' sx={{ marginTop: 5 }}>
											There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..
										</Typography>
									</Grid>
								</Box>
							</Box>
						</Grid>
					</Grid>

				</Grid>
			);
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
		<Container fixed>
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<ManageAccountsTwoToneIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
				My profile
				</Typography>

			</Box>
			<Box sx={{ width: '100%' }}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
						<Tab icon={<PersonPinIcon />} label="Info" {...a11yProps(0)} />
						<Tab icon={<ManageAccountsIcon />} label="Update" {...a11yProps(1)} />
						<Tab icon={<VpnKeyIcon />} label="Security" {...a11yProps(2)} />
					</Tabs>
				</Box>
				<TabPanel value={value} index={0}>
				<div>{WelcomeDisplay()}</div>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<ProfileUpdate userProfile={state.userProfile} />
				</TabPanel>
				<TabPanel value={value} index={2}>
					Item for SECURITY
				</TabPanel>
			</Box>

		</Container>
	);
}

export default Profile;
