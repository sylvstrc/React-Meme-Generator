import React from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import Navbar from '../navbar/navbar'
import Landing from '../landing/landing'

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Landing/>
    </div>
  );
}

export default App;
