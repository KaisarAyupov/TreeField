import React, { useState, useEffect } from 'react'
import Axios from "axios";
import {useImmerReducer} from 'use-immer';
import { useNavigate } from 'react-router-dom';
// react-leaflet
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Icon } from 'leaflet';
// MUI
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {Card, CardHeader, CardMedia, CardContent, CardActions} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import RoomIcon from '@mui/icons-material/Room';

// Map icons
import houseIconpng from './Assets/Mapicons/house.png';
import apartmentIconpng from './Assets/Mapicons/trash_bin32.png';
import officeIconpng from './Assets/Mapicons/office.png';

const drawerWidth = 400;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function Contacts() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

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





  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <Grid item xs={4} style={{marginTop: "0.5rem"}}>
        {AllListings.map((listing) => {
          return (
            <Card key={listing.id} >
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
                <Typography >
                  {listing.listing_type}:  
                {listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Typography>
              ): (
                <Typography>
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
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '90vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Typography>Test</Typography>              
            </Grid>
          </Container>
        </Box>
      </Box>

    </ThemeProvider>
    
  );
}

export default Contacts