import React, { useState, useEffect, useContext } from 'react';
import { ApiContext } from './state/Context'
import genHorzBar from './d3'

import Chart from './components/Chart'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>This is a test for D3</h1>
      </header>
      <div
        id='d3-stuff'
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%'
      }}/>
      <Chart endpointPrefix='/data/count'/>
      <Chart endpointPrefix='/data/species'/>

    </div>
  );
}

export default App;
