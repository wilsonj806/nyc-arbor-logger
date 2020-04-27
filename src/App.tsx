import React, { useState, SyntheticEvent } from 'react';

import NavBar from './components/NavBar'
import Chart from './components/Chart'
import Modal from './components/Modal'
import MessageManager from './components/MessageManager';


function App() {
  const [shouldDisplay, setShouldDisplay] = useState(false)


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
        <MessageManager />
        <NavBar/>
        <div
          id='d3-stuff'
        >
          <Chart chartSelector='#d3-stuff'/>
        </div>
        <button className='fab' id='fab--info' onClick={() => setShouldDisplay(!shouldDisplay) }>
          ?
        </button>
      </div>
    </>
  );
}

export default App;
