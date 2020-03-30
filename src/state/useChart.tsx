import  { useEffect, useState } from 'react'
import genHorzBar from '../d3'

const primaryEndpoint = process.env.NODE_ENV === 'production' ? 'https://nyc-tree-data-fetcher.herokuapp.com' : 'http://localhost:5000'


function useChart(selector = '') {
  if(!selector || selector === '') throw new Error('invalid selector, expecting a selector that complies with HTML standards')
  const [endpointPrefix, setEndpointPrefix] = useState('');
  const [xKey, setXKey] = useState('')
  const [yKey, setYKey] = useState('')
  const [data, setData] = useState<any[]>([])


  useEffect(() => {
    if (endpointPrefix === '') return
    const asyncFn = async () => {
      // Generate D3 keys
      const { xKey, yKey } = checkEndpoint(endpointPrefix)
      setXKey(xKey);
      setYKey(yKey);
      const res = await fetch(primaryEndpoint + endpointPrefix)
      const data = await res.json().then(json => processJson(xKey, yKey, json.data))
      setData(data)
    }

    asyncFn();

  }, [endpointPrefix])

  useEffect(() => {
    if (data.length > 0) {
      genHorzBar(xKey, yKey, selector)(data)
    }
  },[xKey,yKey,data])

  return {
    setEndpointPrefix
  }
}

function checkEndpoint(endpointPrefix = '') {
  switch (endpointPrefix) {
    case '/data/count':
      return {
        xKey: 'count',
        yKey: 'boro'
      }
    case '/data/species':
      return {
        xKey: 'count',
        yKey: 'species'
      }
    default:
      throw new Error('Expecting a valid endpoint')
  }
}

function processJson(xKey:string , yKey:string, data: any) {
  const res = []
  const copy = Object.assign({}, data);
  for (const key in copy) {
    res.push({ [yKey]: key, [xKey]: copy[key]})
  }
  return res
}

export default useChart;