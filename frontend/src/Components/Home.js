import React, { useState } from 'react'
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';

// MUI
import { Button, Typography, Grid, AppBar, Toolbar } from '@mui/material';
import {makeStyles} from '@mui/styles';
import ProductHeroLayout from './ProductHeroLayout';
// Components
import CustomCard from './CustomCard';

// Assets

const backgroundImage =
  'https://images.unsplash.com/photo-1528190336454-13cd56b45b5a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';

let theme = createTheme();
theme = responsiveFontSizes(theme);
  
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
      <ThemeProvider theme={theme}>
        <Typography color="inherit" align="center" variant="h3" marked="center">
          NAME OF THE SITE!
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

      </ThemeProvider>
      
    </ProductHeroLayout>
  );
}