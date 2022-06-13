import React, {useEffect, useState, useRef, useMemo, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import {useImmerReducer} from 'use-immer';
// Context
import StateContext from '../Contexts/StateContext';
// Assets
import Waltham from "./Assets/Boroughs/Waltham";
// MUI
import { Grid, AppBar, Typography, Button, Card, CardHeader, CardMedia, CardContent, CircularProgress, TextField, FormControlLabel, Checkbox, Snackbar } from '@mui/material';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    formConteiner: {
        width: '75%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '3rem',
        border: '5px solid black',
        padding: '3rem',
    },
    registerBtn: {
        backgroundColor: "orange",
        color: "white",
        fontSize: "0.8rem",
        border: "1px solid black",
        marginLeft: "1rem",
      },
      picturesBtn: {
        backgroundColor: "blue",
        color: "white",
        fontSize: "1.1rem",
        marginLeft: "1rem",
        '&:hover': {
          backgroundColor: "green"
        }
      },
      
  });

const listingTypeOptions = [
    {
        value: "",
        label: "",
    },
    {
        value: "Apartment",
        label: "Apartment",
    },
    {
        value: "House",
        label: "House",
    },
    {
        value: "Office",
        label: "Office",
    },
];
const propertyStatusOptions = [
    {
        value: "",
        label: "",
    },
    {
        value: "Sale",
        label: "Sale",
    },
    {
        value: "Rent",
        label: "Rent",
    },
];
const rentalFrequencyOptions = [
    {
        value: "",
        label: "",
    },
    {
        value: "Month",
        label: "Month",
    },
    {
        value: "Week",
        label: "Week",
    },
    {
        value: "Day",
        label: "Day",
    },
];
function ListingUpdate(props) {
    const classes = useStyles();
    const navigate = useNavigate();
    const GlobalState = useContext(StateContext)
    const initialState = {
        titleValue: props.listingData.title,
        listingTypeValue: props.listingData.listing_type,
        descriptionValue: props.listingData.description,
        propertyStatusValue: props.listingData.property_status,
        priceValue: props.listingData.price,
        rentalFrequencyValue: props.listingData.rental_frequency,
        roomsValue: props.listingData.rooms,
        furnishedValue: props.listingData.furnished, 
        poolValue: props.listingData.pool,       
        elevatorValue: props.listingData.elevator,
        cctvValue: props.listingData.cctv,
        parkingValue: props.listingData.parking,
        sendRequest: 0,
        openSnack: false,
        disabledBtn: false,
      };

    function ReduserFunction(draft, action) {
        switch (action.type) {
            case 'catchTitleChange':
                draft.titleValue = action.titleChosen;
                break;
            case 'catchListingTypeChange':
                draft.listingTypeValue = action.listingTypeChosen;
                break;
            case 'catchDescriptionChange':
                draft.descriptionValue = action.descriptionChosen;
                break;
            case 'catchPropertyStatusChange':
                draft.propertyStatusValue = action.propertyStatusChosen;
                break;
            case 'catchPriceChange':
                draft.priceValue = action.priceChosen;
                break;
            case 'catchRentalFrequencyChange':
                draft.rentalFrequencyValue = action.rentalFrequencyChosen;
                break;
            case 'catchRoomsChange':
                draft.roomsValue = action.roomsChosen;
                break;
            case 'catchFurnishedChange':
                draft.furnishedValue = action.furnishedChosen;
                break;
            case 'catchPoolChange':
                draft.poolValue = action.poolChosen;
                break;
            case 'catchelEvatorChange':
                draft.elevatorValue = action.elevatorChosen;
                break;
            case 'catchCctvChange':
                draft.cctvValue = action.cctvChosen;
                break;
            case 'catchParkingChange':
                draft.parkingValue = action.parkingChosen;
                break;
            case 'changeSendRequest':
                draft.sendRequest = draft.sendRequest + 1;
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
        console.log("Test form");
        dispatch({type: 'changeSendRequest'});
        dispatch({type: 'disableTheButton'});          
      }

    useEffect(()=>{
        if (state.sendRequest){
            async function UpdateProperty(){
                const formData = new FormData()
                if (state.listingTypeValue === 'Office'){
                    formData.append('title', state.titleValue)
                    formData.append('description', state.descriptionValue)
                    formData.append('listing_type', state.listingTypeValue)
                    formData.append('property_status', state.propertyStatusValue)
                    formData.append('price', state.priceValue)
                    formData.append('rental_frequency', state.rentalFrequencyValue)
                    formData.append('rooms', 0)
                    formData.append('furnished', state.furnishedValue)
                    formData.append('pool', state.poolValue)
                    formData.append('elevator', state.elevatorValue)
                    formData.append('cctv', state.cctvValue)
                    formData.append('parking', state.parkingValue)
                    formData.append('seller', GlobalState.userId)
                } else{
                    formData.append('title', state.titleValue)
                    formData.append('description', state.descriptionValue)
                    formData.append('listing_type', state.listingTypeValue)
                    formData.append('property_status', state.propertyStatusValue)
                    formData.append('price', state.priceValue)
                    formData.append('rental_frequency', state.rentalFrequencyValue)
                    formData.append('rooms', state.roomsValue)
                    formData.append('furnished', state.furnishedValue)
                    formData.append('pool', state.poolValue)
                    formData.append('elevator', state.elevatorValue)
                    formData.append('cctv', state.cctvValue)
                    formData.append('parking', state.parkingValue)
                    formData.append('seller', GlobalState.userId)
                }               

                try {
                    const response = await Axios.patch(`http://localhost:8000/api/listings/${props.listingData.id}/update/`, formData);
                    console.log(response.data);
                    dispatch({ type: "openTheSnack" });
                } catch(e){
                    console.log(e.response);
                    dispatch({type: 'allowTheButton'});
                }
            }
            UpdateProperty();
        }

    }, [state.sendRequest]);

    useEffect(()=>{
        if (state.openSnack){
          setTimeout(()=>{
            navigate(0)
          }, 1500)
        }
      }, [state.openSnack]);

    function PriceDisplay(){
        if (state.propertyStatusValue === 'Rent' && state.rentalFrequencyValue ==='Day'){
            return 'Price per day*'
        }
        else if (state.propertyStatusValue === 'Rent' && state.rentalFrequencyValue ==='Week'){
            return 'Price per week*'
        }
        else if (state.propertyStatusValue === 'Rent' && state.rentalFrequencyValue ==='Month'){
            return 'Price per month*'
        }
        else {
            return 'Price*'
        }
    }
    
    return (
        <div className={classes.formConteiner}>
            <form onSubmit={FormSubmit}>
                <Grid item container style={{ marginTop: '1rem' }}>
                    <Typography variant='h4'>Update Listing</Typography>
                </Grid>                
                <Grid item container style={{ marginTop: '1rem' }}>
                    <TextField
                        id="title"
                        label="Title*"
                        variant="standard"
                        fullWidth
                        value={state.titleValue}
                        onChange={(e) =>
                            dispatch({
                                type: 'catchTitleChange',
                                titleChosen: e.target.value
                            })
                        }
                    />
                </Grid>
                <Grid item container justifyContent="space-between">
                    <Grid item xs={5} style={{ marginTop: '1rem' }}>
                        <TextField
                            id="listingType"
                            label="Listing Type*"
                            variant="standard"
                            fullWidth
                            value={state.listingTypeValue}
                            onChange={(e) =>
                                dispatch({
                                    type: 'catchListingTypeChange',
                                    listingTypeChosen: e.target.value
                                })
                            }
                            select
                            SelectProps={{
                                native: true,
                            }}
                        > 
                            {listingTypeOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                        </TextField>
                    </Grid>                               
                    <Grid item xs={5} style={{ marginTop: '1rem' }}>
                        <TextField
                            id="propertyStatus"
                            label="Property Status*"
                            variant="standard"
                            fullWidth
                            value={state.propertyStatusValue}
                            onChange={(e) =>
                                dispatch({
                                    type: 'catchPropertyStatusChange',
                                    propertyStatusChosen: e.target.value
                                })
                            }
                            select
                            SelectProps={{
                                native: true,
                            }}
                        > 
                            {propertyStatusOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                        </TextField>
                    </Grid>

                </Grid>
                <Grid item container justifyContent="space-between">
                    <Grid item xs={5} style={{ marginTop: '1rem' }}>
                        <TextField
                            id="rentalFrequency"
                            label="Rental Frequency"
                            variant="standard"
                            disabled={state.propertyStatusValue === 'Sale' ? true : false}
                            fullWidth
                            value={state.rentalFrequencyValue}
                            onChange={(e) =>
                                dispatch({
                                    type: 'catchRentalFrequencyChange',
                                    rentalFrequencyChosen: e.target.value
                                })
                            }
                            select
                            SelectProps={{
                                native: true,
                            }}
                        > 
                            {rentalFrequencyOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={5} style={{ marginTop: '1rem' }}>
                        <TextField
                            id="price"
                            type="number"
                            label={PriceDisplay()}
                            variant="standard"
                            fullWidth
                            value={state.priceValue}
                            onChange={(e) =>
                                dispatch({
                                    type: 'catchPriceChange',
                                    priceChosen: e.target.value
                                })
                            }
                        />
                    </Grid>  
                </Grid>
                
            {/* Description */}           
                <Grid item container style={{ marginTop: '1rem' }}>
                    <TextField
                        id="description"
                        label="Description"
                        variant="outlined"
                        multiline
                        rows={6}
                        fullWidth
                        value={state.descriptionValue}
                        onChange={(e) =>
                            dispatch({
                                type: 'catchDescriptionChange',
                                descriptionChosen: e.target.value
                            })
                        }
                    />
                </Grid> 
            {state.listingTypeValue === 'Office' ? (
            ""
            ) : (
                <Grid item xs={3} container style={{ marginTop: '1rem' }}>
                    <TextField
                        id="rooms"
                        label="Rooms"
                        type="number"
                        variant="standard"
                        fullWidth
                        value={state.roomsValue}
                        onChange={(e) =>
                            dispatch({
                                type: 'catchRoomsChange',
                                roomsChosen: e.target.value
                            })
                        }
                    />
                </Grid>
            )}
                <Grid item container justifyContent="space-between">
                    <Grid item xs={2} style={{ marginTop: '1rem' }}>
                        <FormControlLabel
                            control={<Checkbox checked={state.furnishedValue} 
                            onChange={(e) =>
                                dispatch({
                                    type: 'catchFurnishedChange',
                                    furnishedChosen: e.target.checked
                                })
                            } />}
                            label="Furnished"
                        />
                    </Grid>
                    <Grid item xs={2} style={{ marginTop: '1rem' }}>
                        <FormControlLabel
                            control={<Checkbox checked={state.poolValue} 
                            onChange={(e) =>
                                dispatch({
                                    type: 'catchPoolhange',
                                    poolChosen: e.target.checked
                                })
                            } />}
                            label="Poll"
                        />
                    </Grid>
                    <Grid item xs={2} style={{ marginTop: '1rem' }}>
                        <FormControlLabel
                            control={<Checkbox checked={state.elevatorValue} 
                            onChange={(e) =>
                                dispatch({
                                    type: 'catchElevatorChange',
                                    elevatorChosen: e.target.checked
                                })
                            } />}
                            label="Elevator"
                        />
                    </Grid>
                    <Grid item xs={2} style={{ marginTop: '1rem' }}>
                        <FormControlLabel
                            control={<Checkbox checked={state.cctvValue} 
                            onChange={(e) =>
                                dispatch({
                                    type: 'catchCctvChange',
                                    cctvChosen: e.target.checked
                                })
                            } />}
                            label="CCTV"
                        />
                    </Grid>
                    <Grid item xs={2} style={{ marginTop: '1rem' }}>
                        <FormControlLabel
                            control={<Checkbox checked={state.parkingValue} 
                            onChange={(e) =>
                                dispatch({
                                    type: 'catchParkingChange',
                                    parkingChosen: e.target.checked
                                })
                            } />}
                            label="Parking"
                        />
                    </Grid>
                </Grid>
                <Grid item container xs={8} style={{ marginTop: '1rem', marginLeft: "auto", marginRight: "auto" }}>
                    <Button 
                        variant="contained" 
                        fullWidth 
                        type="submit" 
                        className={classes.registerBtn}
                        disabled= {state.disabledBtn}
                    >
                        Update
                    </Button>
                </Grid>
            </form> 
            <Button variant='contained' onClick={props.closeDialog}>Cancel</Button> 
            <Snackbar
                open={state.openSnack}
                message="You have successfully updated this listing!"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            />         
        </div>
    )
}

export default ListingUpdate