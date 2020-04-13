import  { useEffect, useState } from 'react'
import * as d3 from 'd3'

import genHorzBar from '../d3'

const primaryEndpoint = process.env.NODE_ENV === 'production' ? 'https://nyc-tree-data-fetcher.herokuapp.com' : 'http://localhost:5000'


function useChart() {
  const [endpointPrefix, setEndpointPrefix] = useState('')
  const [selector, setSelector] = useState('')
  const [xKey, setXKey] = useState('')
  const [yKey, setYKey] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [data, setData] = useState<any[]>([])


  useEffect(() => {
    if (endpointPrefix === '') return
    const asyncFn = async () => {
      // Generate D3 keys
      const { xKey, yKey } = checkEndpoint(endpointPrefix)
      setXKey(xKey);
      setYKey(yKey);
      setIsLoading(i => true)
      const res = await fetch(primaryEndpoint + endpointPrefix)
      const data = await res.json().then(json => processJson(xKey, yKey, json.data))
      setData(data)
    }

    asyncFn();

  }, [endpointPrefix])

  useEffect(() => {
    if (data.length > 0) {
      // check to make sure data isn't stale!
      const keys = Object.keys(data[0])
      const isStale = yKey !== keys[0] || xKey !== keys[1]
      if (isStale) return

      genHorzBar(xKey, yKey, selector)(data)
      setIsLoading(i => false)
    }
  },[xKey,yKey,data, selector])

  useEffect(() => {
    if (selector && selector !== '') {
      toggleSvg(selector, isLoading)
    }
  },[selector, isLoading])


  const setEndpointPrefixWrap = (nextPrefix: string) => {
    if (nextPrefix === endpointPrefix) return
    setEndpointPrefix(nextPrefix)
  }
  return {
    isLoading,
    setSelector,
    setEndpointPrefixWrap,
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
    case '/data/brooklyn/species':
    case '/data/bronx/species':
    case '/data/queens/species':
    case '/data/manhattan/species':
    case '/data/staten%32island/species':
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

function toggleSvg(selector: string, shouldHide: boolean) {
  console.log('toggling out')
  if (shouldHide) {
    d3.select(selector + ' svg')
      .style('display', 'none')
  } else {
    d3.select(selector + 'svg')
      .attr('visibility', 'visible')
  }
}

export default useChart;