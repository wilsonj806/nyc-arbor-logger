import  { useEffect, useState, useContext } from 'react'
import * as d3 from 'd3'

import { ApiContext } from './Context'

import genHorzBar from './genBarChart'

const baseEndpoint = process.env.NODE_ENV === 'production' ? 'https://nyc-tree-data-fetcher.herokuapp.com' : 'http://localhost:5000'


function useChart(selector: string) {
  // Declaring Context as required state to sync with
  const { state, updateMessageFn } = useContext(ApiContext)

  const [xKey, setXKey] = useState('')
  const [yKey, setYKey] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [data, setData] = useState<any[]>([])

  const { endpoint, message } = state

  // Performing fetch side effect
  useEffect(() => {
    if (endpoint === '' || message !== '') return
    setIsLoading(true)
    const asyncFetch = async () => {
      const { xKey, yKey } = checkEndpoint(endpoint)
      try {
        const res = await fetch(baseEndpoint + endpoint)

        if (Math.floor(res.status / 100) >= 4) {
          const str = await res.text()
          if (str[0] === '{') {
            throw new Error(res.statusText)
          }
          throw new Error(str)
        }
        const data = await res.json().then(json => processJson(xKey, yKey, json.data))
        // synchronizing local state with Context state
        setData(data)
        setXKey(xKey)
        setYKey(yKey)
      } catch (err) {
        // TODO make Context sync with Errors
        updateMessageFn(err.message)
        setIsLoading(false)
      }
    }
    debounce(asyncFetch, 250)();
  }, [endpoint, updateMessageFn, message])

  // Performing D3 DOM modification side effect
  useEffect(() => {
    if (data.length === 0) return
    genHorzBar(xKey, yKey, selector)(data)
    setIsLoading(i => false)
  }, [data, xKey, yKey, selector])

  // Performing D3 DOM modification side effect
  useEffect(() => {
    if (selector && selector !== '') {
      toggleSvg(selector, isLoading)
    }
  },[selector, isLoading])

  return {
    isLoading,
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
    case '/data/staten%20island/species':
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
  if (shouldHide) {
    d3.select(selector + ' svg')
      .style('display', 'none')
  } else {
    d3.select(selector + 'svg')
      .attr('visibility', 'visible')
  }
}

function debounce(fn: () => Promise<void>|void, time: number) {
  let timer: any;

  return function(this: any) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      // eslint-disable-next-line
      fn()
    }, time)
  }
}

export default useChart;