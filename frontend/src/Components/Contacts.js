import React, { useState, useEffect } from 'react'
import Axios from "axios";
import {useImmerReducer} from 'use-immer';
import { useNavigate } from 'react-router-dom';
// react-leaflet
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Icon } from 'leaflet';
// MUI
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Grid, Button, Card, CardHeader, CardMedia, CardContent,CircularProgress, CardActions} from '@mui/material';
// Map icons
import RoomIcon from '@mui/icons-material/Room';
import houseIconpng from './Assets/Mapicons/house.png';
import apartmentIconpng from './Assets/Mapicons/trash_bin32.png';
import officeIconpng from './Assets/Mapicons/office.png';

const drawerWidth = 340;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function Contacts() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box sx={{ top: 15, ml: 3 }} position="absolute">
        <IconButton
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon sx={{ color: 'white', fontSize: 30 }}/>
        </IconButton>
      </Box>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Grid item xs={4} style={{ marginTop: "0.5rem" }}>
          {AllListings.map((listing) => {
            return (              
              <Card sx={{ maxWidth: 345 }} key={listing.id}>
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
                  component="img"
                  alt={listing.title}
                  height="140"
                  image={listing.picture1}
                  onClick={() => navigate(`/listings/${listing.id}`)}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {listing.seller_agency_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {listing.description.substring(0, 150)}...
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">{listing.listing_type}</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            )
          })}
        </Grid>       
      </Drawer>
      <Main open={open}>
        <Grid item xs={12} sm={5} style={{ height: "90vh" }} >
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
      </Grid>
      </Main>
    </Box>
  );
}
export default Contacts