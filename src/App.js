import React from 'react';

import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Dashboard from './Components/Dahboard/Piechart';
import WebcamCapture from './Components/WebCam/WebCam';


function App() {
  return (
    <Router>
    <div className="App">

     <Navbar/>
  
     <Route exact path="/Dashboard" />
     
     <WebcamCapture/>
    </div>  </Router>
  );
}

export default App;
