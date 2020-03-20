import React, { useState, useEffect } from 'react';
import d3Gen from './d3'
function processJson(data) {
  const res = []
  const copy = Object.assign({}, data);
  for (const key in copy) {
    res.push({ boro: key, count: copy[key]})
  }
  return res
}

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    const asyncFetch = async () => {
      const res = await fetch('http://localhost:5000/data/count')
      const data = await res.json().then(json => json.data)

      setData(processJson(data))
    }

    asyncFetch()
  }, [])

  useEffect(() => {
    if (data.length > 0) {
      d3Gen(data)
    }
  }, [data])
  console.log(data)


  return (
    <div className="App">
      <header className="App-header">
        <h1>This is a test for D3</h1>
      </header>
      <div id="ctr-d3" style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
      }}/>
    </div>
  );
}

export default App;
