import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { Button } from '@mui/material';

function Home() {
  const [btnColor, setBtnColor] = useState("error")
  return (
    <Button 
    onClick={()=>setBtnColor("success")} 
    color={btnColor} 
    size="large" 
    variant="contained"
    >
      Turn Green
    </Button>
  )
}

export default Home