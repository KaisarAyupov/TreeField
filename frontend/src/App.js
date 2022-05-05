import logo from './logo.svg';
import './App.css';

import SecondComponent from "./Components/SecondComponent";
import React from 'react';

function App() {
  function MyComponent() {
    return (
      <React.Fragment>
        <h1>This is my First Component</h1>
      <p>This paragraph is part of component</p>
      <li>This is li type</li>
      </React.Fragment>
      
    )
  }
  return (
    <div>
      <h1>This is App Component</h1>
      <MyComponent />
      <SecondComponent />
    </div>
  );
}

export default App;
