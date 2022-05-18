import {BrowserRouter, Route, Routes} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import AppleComponent from './Components/AppleComponent';
import React from 'react';


function App() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>This is the homepage</h1>}/>
        <Route path='/login' element={<h1>This is the loginpage</h1>}/>
        <Route path='/listings' element={<h1>This is the property listings page</h1>}/>
        
       
        
      </Routes>    
    </BrowserRouter>
  )
}

export default App;
