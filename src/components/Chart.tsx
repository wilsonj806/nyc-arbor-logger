import React, { FC, useEffect } from 'react'

import Spinner from './Spinner'

import useChart from '../state/useChart'

import { ChartProps } from '../types'

// TODO make Chart render a spinner if it's fetching
const Chart: FC<ChartProps> = ({endpointPrefix, chartSelector }) => {
  const { setEndpointPrefixWrap, setSelector, isLoading } = useChart()

  useEffect(() => {
    setEndpointPrefixWrap(endpointPrefix)
  }, [endpointPrefix, setEndpointPrefixWrap])

  useEffect(() => {
    setSelector(chartSelector)
  }, [chartSelector, setSelector])

  const ToRender = isLoading ? <Spinner/> : null
  return (
    <>
      { ToRender }
    </>
  )
}

export default Chart;