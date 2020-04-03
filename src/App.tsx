import React, { useContext } from 'react';
import { ApiContext } from './state/Context'

import NavBar from './components/NavBar'
import Chart from './components/Chart'


function App() {
  const { endpointPrefix } = useContext(ApiContext)
  return (
    <div className="App">
      <header className="App-header">
        <h1>This is a test for D3</h1>
      </header>
      <NavBar/>
      <div
        id='d3-stuff'
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%'
      }}>
        <Chart endpointPrefix={endpointPrefix} chartSelector='#d3-stuff'/>
      </div>
    </div>
  );
}

export default App;
