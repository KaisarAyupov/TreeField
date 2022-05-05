import logo from './logo.svg';
import './App.css';

import SecondComponent from "./Components/SecondComponent";

function App() {
  function MyComponent() {
    return <h1>This is my First Component</h1>;
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
