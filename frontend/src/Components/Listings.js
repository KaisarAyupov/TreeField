import React, { useState, useEffect } from 'react'
import Axios from "axios";
import {useImmerReducer} from 'use-immer';
import { useNavigate } from 'react-router-dom';
// react-leaflet
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Icon } from 'leaflet';
// MUI
import { Grid, AppBar, Typography, Button, Card, CardHeader, CardMedia, CardContent,CircularProgress, IconButton, CardActions} from '@mui/material';
import { makeStyles } from '@mui/styles';
import RoomIcon from '@mui/icons-material/Room';

// Map icons
import houseIconpng from './Assets/Mapicons/house.png';
import apartmentIconpng from './Assets/Mapicons/trash_bin32.png';
import officeIconpng from './Assets/Mapicons/office.png';


const useStyles = makeStyles({
  cardStyle: {
    margin: "0.5rem",
    border: "1px solid black",
    position: "relative",
  },
  picturStyle: {
    paddingRight: "1rem",
    paddingLeft: "1rem",
    height: "20rem",
    width: "30rem",
    cursor: 'pointer',
  },
  priceOverlay: {
    position: "absolute",
    backgroundColor: "green",
    zIndex: "1000",
    color: "white",
    top: "70px",
    left: "20px",
    padding: "5px"
  }

});

function Listings() {
  //fetch('http://127.0.0.1:8000/api/listings/').then(response=> response.json()).then(data=>console.log(data))
  const navigate = useNavigate();
  const classes = useStyles();
  const houseIcon = new Icon({
    iconUrl: houseIconpng,
    iconSize: [40, 40],
  })
  const apartmentIcon = new Icon({
    iconUrl: apartmentIconpng,
    iconSize: [32, 32],
  })
  const officeIcon = new Icon({
    iconUrl: officeIconpng,
    iconSize: [40, 40],
  })

  const [lattude, setLatitude] = useState(43.2611)
  const [longitude, setLongitude] = useState(76.8822)

  const initialState = {
    mapInstance: null,
  };

function ReduserFunction(draft, action) {
    switch (action.type) {
        case 'getMap':
            draft.mapInstance = action.mapData;
            break;

    }

}
const [state, dispatch] = useImmerReducer(ReduserFunction, initialState)

function TheMapComponent() {
    const map = useMap();
    dispatch({ type: "getMap", mapData: map });
    return null;
}  
  const [AllListings, setAllListings] = useState([])
  const [dataIsLoading, setDataIsLoading] = useState(true)

  useEffect(() => {
    const source =Axios.CancelToken.source();
    async function GetAllListings(){
      try {
        const response = await Axios.get('http://127.0.0.1:8000/api/listings/', {cancelToken: source.token});
      // console.log(response.data)
      setAllListings(response.data)
      setDataIsLoading(false)
      } catch(error){
        console.log(error)
      }
    }
    GetAllListings();
    return ()=>{
      source.cancel();
    }
  }, [])

  if (dataIsLoading === false) {
    console.log(AllListings[0].location)
  }
  if (dataIsLoading === true) {
    return (
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        style={{ height: '100vh' }}
      >
        <CircularProgress />
      </Grid>
    );    
  }
  return (
    <Grid container>
      <Grid item xs={4} style={{marginTop: "0.5rem"}}>
        {AllListings.map((listing) => {
          return (
            <Card key={listing.id} className={classes.cardStyle}>
              <CardHeader
                action={
                  <IconButton
                    aria-label="settings"
                    onClick={() =>
                      state.mapInstance.flyTo(
                        [listing.lat, listing.lng],
                        16
                      )
                    }
                  >
                    <RoomIcon />
                  </IconButton>
                }
                title={listing.title}
              />
              <CardMedia
              className={classes.picturStyle}
                component="img" height="194"
                image={listing.picture1}
                alt={listing.title}
                onClick={()=>navigate(`/listings/${listing.id}`)}
              />
              <CardContent>
                <Typography variant="body2">
                  {listing.description.substring(0, 150)}...
                </Typography>
              </CardContent>
              {listing.property_status === "Sale" ? (
                <Typography className={classes.priceOverlay}>
                  {listing.listing_type}:  
                {listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Typography>
              ): (
                <Typography className={classes.priceOverlay}>
                {listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} / {listing.rental_frequency }
              </Typography>
              )}
              
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  {listing.seller_agency_name}
                </IconButton>
              </CardActions>
            </Card>
          )
        })}
      </Grid>
      <Grid item xs={8}>
        <AppBar position='sticky'>
          <div style={{ height: "100vh" }}>
            <MapContainer center={[43.2611, 76.8822]} zoom={13} scrollWheelZoom={true}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <TheMapComponent />
              {AllListings.map((listing) => {
                function IconDisplay() {
                  if (listing.listing_type === 'House') {
                    return houseIcon;
                  }
                  else if (listing.listing_type === 'Apartment') {
                    return apartmentIcon;
                  }
                  else if (listing.listing_type === 'Office') {
                    return officeIcon;
                  }
                }
                return (
                  <Marker
                    key={listing.id}
                    icon={IconDisplay()}
                    position={[
                      listing.lat,
                      listing.lng,
                    ]}>
                    {<Popup>
                      <Typography variant='h5'>
                        {listing.title}
                      </Typography>
                      <img 
                        src={listing.picture1} 
                        style={{ height: '14rem', width: "18rem", cursor: "pointer" }} 
                        onClick={()=>navigate(`/listings/${listing.id}`)}
                      />
                      <Typography variant='body1'>
                        {listing.description.substring(0, 150)}
                      </Typography>
                      <Button variant='contained' fullWidth onClick={()=>navigate(`/listings/${listing.id}`)}>
                        Deteils
                      </Button>
                    </Popup>}
                  </Marker>
                )
              })}              
            </MapContainer>
          </div>
        </AppBar>
      </Grid>

    </Grid>
  )
}

export default Listings