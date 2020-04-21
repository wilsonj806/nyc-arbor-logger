import React, { useContext, useState, SyntheticEvent } from 'react';
import { ApiContext } from './state/Context'

import NavBar from './components/NavBar'
import Chart from './components/Chart'
import Modal from './components/Modal'


function App() {
  const [shouldDisplay, setShouldDisplay] = useState(false)

  const { endpointPrefix } = useContext(ApiContext)


  const handleClick = (event: SyntheticEvent) => {
    const target = event.target as Element;
    if (!shouldDisplay && target.id !== 'fab--info') return;
    if (shouldDisplay) {
      setShouldDisplay(false);
    }
  }

  return (
    <>
      <Modal shouldDisplay={ shouldDisplay }/>
      <div className="App" onClick={ handleClick }>
        <header className="App-header">
          <h1>NYC Arbor Logger</h1>
        </header>
        <NavBar/>
        <div
          id='d3-stuff'
        >
          <Chart endpointPrefix={endpointPrefix} chartSelector='#d3-stuff'/>
        </div>
        <button className='fab' id='fab--info' onClick={() => setShouldDisplay(!shouldDisplay) }>
          ?
        </button>
      </div>
    </>
  );
}

export default App;
