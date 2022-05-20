import React, {useState} from 'react'
// react-leaflet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet';
// MUI
import { Grid, AppBar, Typography, Button } from '@mui/material';

// Map icons
import houseIconpng from './Assets/Mapicons/house.png';
import apartmentIconpng from './Assets/Mapicons/apartment.png';
import officeIconpng from './Assets/Mapicons/office.png';

// Assets
import img1 from './Assets/img1.jpg';
import { height } from '@mui/system';


function Listings() {
  const houseIcon = new Icon({
    iconUrl: houseIconpng,
    iconSize: [40, 40],
  })
  const apartmentIcon = new Icon({
    iconUrl: apartmentIconpng,
    iconSize: [40, 40],
  })
  const officeIcon = new Icon({
    iconUrl: officeIconpng,
    iconSize: [40, 40],
  })

  const [lattude, setLatitude] = useState(43.2611)
  const [longitude, setLongitude] = useState(76.8822)

  function GoEast(){
    setLatitude(43.2399);
    setLongitude(76.8853);
  }
  function Gocenter(){
    setLatitude(43.2611);
    setLongitude(76.8822);
  }
  return (
    <Grid container>
      <Grid item xs={4}>
        <Button onClick={GoEast}>Go East</Button>
        <Button onClick={Gocenter}>Go East</Button>
        Blank Space
      </Grid>
      <Grid item xs={8}>
        <AppBar position='sticky'>
          <div style={{ height: "100vh" }}>
            <MapContainer center={[43.2611, 76.8822]} zoom={13} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
              icon={houseIcon}
              position={[lattude, longitude]}>
                {<Popup>
                  <Typography variant='h5'>
                    A title
                  </Typography>
                  <img src={img1} style={{height: '14rem', width: "18rem"}} />
                  <Typography variant='body1'>
                    Thi is som text
                  </Typography>
                  <Button variant='contained' fullWidth>
                    A link
                  </Button>
                </Popup>}
              </Marker>
            </MapContainer>
          </div>
        </AppBar>
      </Grid>

    </Grid>
  )
}

export default Listings