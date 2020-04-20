import React, { useContext, useState } from 'react';
import { ApiContext } from './state/Context'

import NavBar from './components/NavBar'
import Chart from './components/Chart'
import Modal from './components/Modal'


function App() {
  const [shouldDisplay, setShouldDisplay] = useState(false)

  const { endpointPrefix } = useContext(ApiContext)
  return (
    <>
      <Modal shouldDisplay={ shouldDisplay }/>
      <div className="App">
        <header className="App-header">
          <h1>NYC Arbor Logger</h1>
        </header>
        <NavBar/>
        <div
          id='d3-stuff'
        >
          <Chart endpointPrefix={endpointPrefix} chartSelector='#d3-stuff'/>
        </div>
        <button className='fab' onClick={() => setShouldDisplay(!shouldDisplay) }>
          ?
        </button>
      </div>
    </>
  );
}

export default App;
