import React, { useEffect, useState, useRef, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useImmerReducer } from "use-immer";

// Contexts
import StateContext from "../Contexts/StateContext";

// Assets
import defaultProfilePicture from "./Assets/defaultProfilePicture.jpg";

// MUI
import {
	Grid,
	Alert,
	Typography,
	Button,
	Box,
	styled,
	InputLabel,
	Select,
	Container,
	TextField,
	MenuItem,
	Checkbox,
	Snackbar,
} from "@mui/material";



const ImgStyled = styled('img')(({ theme }) => ({
	width: 120,
	height: 120,
	marginRight: theme.spacing(6.25),
	borderRadius: theme.shape.borderRadius
  }))
const ButtonStyled = styled(Button)(({ theme }) => ({
	[theme.breakpoints.down('sm')]: {
	  width: '100%',
	  textAlign: 'center'
	}
  }))
  
const ResetButtonStyled = styled(Button)(({ theme }) => ({
	marginLeft: theme.spacing(4.5),
	[theme.breakpoints.down('sm')]: {
	  width: '100%',
	  marginLeft: 0,
	  textAlign: 'center',
	  marginTop: theme.spacing(4)
	}
  }))

function ProfileUpdate(props) {
	const navigate = useNavigate();
	const GlobalState = useContext(StateContext);
	const [imgSrc, setImgSrc] = useState('./Assets/defaultProfilePicture.jpg')

	const initialState = {
		agencyNameValue: props.userProfile.agencyName,
		phoneNumberValue: props.userProfile.phoneNumber,
		bioValue: props.userProfile.bio,
		uploadedPicture: [],
		profilePictureValue: props.userProfile.profilePic,
		sendRequest: 0,
		openSnack: false,
		disabledBtn: false,
		openSnack: false,
      	disabledBtn: false,
	};

	function ReducerFuction(draft, action) {
		switch (action.type) {
			case "catchAgencyNameChange":
				draft.agencyNameValue = action.agencyNameChosen;
				break;

			case "catchPhoneNumberChange":
				draft.phoneNumberValue = action.phoneNumberChosen;
				break;

			case "catchBioChange":
				draft.bioValue = action.bioChosen;
				break;

			case "catchUploadedPicture":
				draft.uploadedPicture = action.pictureChosen;
				break;

			case "catchProfilePictureChange":
				draft.profilePictureValue = action.profilePictureChosen;
				break;

			case "changeSendRequest":
				draft.sendRequest = draft.sendRequest + 1;
				break;

			case "openTheSnack":
				draft.openSnack = true;
				break;

			case "disableTheButton":
				draft.disabledBtn = true;
				break;

			case "allowTheButton":
				draft.disabledBtn = false;
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

	const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

	// Use effect to cath uplaoded picture
	useEffect(() => {
		if (state.uploadedPicture[0]) {
			dispatch({
				type: "catchProfilePictureChange",
				profilePictureChosen: state.uploadedPicture[0],
			});
		}
	}, [state.uploadedPicture[0]]);

	// use effect to send the request
	useEffect(() => {
		if (state.sendRequest) {
			async function UpdateProfile() {
				const formData = new FormData();

				if (
					typeof state.profilePictureValue === "string" ||
					state.profilePictureValue === null
				) {
					formData.append("agency_name", state.agencyNameValue);
					formData.append("phone_number", state.phoneNumberValue);
					formData.append("bio", state.bioValue);
					formData.append("seller", GlobalState.userId);
				} else {
					formData.append("agency_name", state.agencyNameValue);
					formData.append("phone_number", state.phoneNumberValue);
					formData.append("bio", state.bioValue);
					formData.append("profile_picture", state.profilePictureValue);
					formData.append("seller", GlobalState.userId);
				}

				try {
					const response = await Axios.patch(
						`http://localhost:8000/api/profiles/${GlobalState.userId}/update/`,
						formData
					);
					dispatch({ type: "openTheSnack" });
				} catch (e) {
					dispatch({ type: "allowTheButton" });
				}
			}
			UpdateProfile();
		}
	}, [state.sendRequest]);

	useEffect(() => {
		if (state.openSnack) {
			setTimeout(() => {
				navigate(0);
			}, 1500);
		}
	}, [state.openSnack]);

	function FormSubmit(e) {
		e.preventDefault();
		dispatch({ type: "changeSendRequest" });
		dispatch({ type: "disableTheButton" });
	}

	function ProfilePictureDisplay() {
		if (typeof state.profilePictureValue !== "string") {
			return (
				<ul>
					{state.profilePictureValue ? (
						<li>{state.profilePictureValue.name}</li>
					) : (
						""
					)}
				</ul>
			);
		} else if (typeof state.profilePictureValue === "string") {
			return (
				<Grid
					item
					style={{
						marginTop: "0.5rem",
						marginRight: "auto",
						marginLeft: "auto",
					}}
				>
					<img
						src={props.userProfile.profilePic}
						style={{ height: "5rem", width: "5rem" }}
					/>
				</Grid>
			);
		}
	}

	return (
		<Container fixed>

			<Grid container spacing={3}>
				<Grid item container  sx={{marginBottom: '1rem' }}>
					<Typography variant="h4">MY PROFILE</Typography>
				</Grid>
				<form style={{ width: '100%' }} onSubmit={FormSubmit}>					
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<ImgStyled src={props.userProfile.profilePic} alt='Profile Pic' />
								<Box>
									<ButtonStyled component='label' variant='outlined' htmlFor='account-settings-upload-image'>
										Upload New Photo
										<input
											hidden
											type="file"
											accept="image/png, image/gif, image/jpeg"
											id='account-settings-upload-image'
											onChange={(e) =>
												dispatch({
													type: "catchUploadedPicture",
													pictureChosen: e.target.files,
												})
											}
										/>
									</ButtonStyled>
									<ResetButtonStyled type='reset' variant='outlined' color='secondary'>
										Reset
									</ResetButtonStyled>
									<Typography variant='body2' sx={{ marginTop: 5 }}>
										Allowed PNG or JPEG. Max size of 800K.
									</Typography>
								</Box>
							</Box>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								id="agencyName"
								label="Agency Name*"
								variant="outlined"
								fullWidth
								value={state.agencyNameValue}
								onChange={(e) =>
									dispatch({
										type: "catchAgencyNameChange",
										agencyNameChosen: e.target.value,
									})
								}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								id="phoneNumber"
								label="Phone Number*"
								variant="outlined"
								fullWidth
								value={state.phoneNumberValue}
								onChange={(e) =>
									dispatch({
										type: "catchPhoneNumberChange",
										phoneNumberChosen: e.target.value,
									})
								}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="bio"
								label="Bio"
								variant="outlined"
								multiline
								rows={6}
								fullWidth
								value={state.bioValue}
								onChange={(e) =>
									dispatch({
										type: "catchBioChange",
										bioChosen: e.target.value,
									})
								}
							/>
						</Grid>
						<Grid item xs={12}>
							<Button variant='contained' sx={{ marginRight: 3.5 }} type="submit" disabled={state.disabledBtn}>
								Save Changes
							</Button>
							<Button type='reset' variant='outlined' color='secondary'>
								Reset
							</Button>
						</Grid>
					</Grid>
					
				</form>
				<Snackbar
					open={state.openSnack}
					message="You have successfully updated your profile!"
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "center",
					}}
				>
					<Alert severity="success" sx={{ width: '100%' }}>
						You have successfully updated your profile!
					</Alert>

				</Snackbar>

			</Grid>

		</Container>
		
	);
}

export default ProfileUpdate;
