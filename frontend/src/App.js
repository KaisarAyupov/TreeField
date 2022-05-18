import {BrowserRouter, Route, Routes} from 'react-router-dom'

import React from 'react';
 // Components
 import Home from './Components/Home';
 import Listings from './Components/Listings';
 import Login from './Components/Login';

function App() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/listings' element={<Listings />}/>
        
       
        
      </Routes>    
    </BrowserRouter>
  )
}

export default App;
