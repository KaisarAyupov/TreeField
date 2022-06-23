import React, { useState } from 'react'
import {Link} from 'react-router-dom'

// MUI
import { Button, Typography, Grid, AppBar, Toolbar } from '@mui/material';
import {makeStyles} from '@mui/styles';
import ProductHeroLayout from './ProductHeroLayout';
// Components
import CustomCard from './CustomCard';

// Assets
import city from './Assets/city.jpg';
const backgroundImage =
  'https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400';
  
export default function Home() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
      i29zx8hy
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting industry..
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        href="/"
        sx={{ minWidth: 200 }}
      >
        Register
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Discover the experience
      </Typography>
    </ProductHeroLayout>
  );
}