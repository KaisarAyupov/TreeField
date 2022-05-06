import logo from './logo.svg';
import './App.css';
import AppleComponent from './Components/AppleComponent';
import Fruit from './Components/Fruit';
import React from 'react';

const   theFruits = [
  {id: 1, name: "Apple", color: "red"},
  {id: 2, name: "Orange", color: "orange"},
  {id: 3, name: "Banana", color: "yellow"},
  {id: 4, name: "Kiwi", color: "green"},
  {id: 5, name: "Mango", color: "red"},
  {id: 6, name: "Avocado", color: "green"},
  ]

function App() {  
  return (
    <>
    {/* <Fruit color="yelow" name="banana" />
    <Fruit color="red" name="aple" /> */}
    {theFruits.map((fruit)=>{
      return <Fruit key={fruit.id} color={fruit.color} name={fruit.name} />
    })}
    </>
  )
}

export default App;
