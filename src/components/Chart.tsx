import { FC, useEffect } from 'react'
import useChart from '../state/useChart'

import { ChartProps } from '../types'

// TODO make Chart render a spinner if it's fetching
const Chart: FC<ChartProps> = ({endpointPrefix, chartSelector }) => {
  const { setEndpointPrefixWrap, setSelector } = useChart()

  useEffect(() => {
    setEndpointPrefixWrap(endpointPrefix)
  }, [endpointPrefix, setEndpointPrefixWrap])

  useEffect(() => {
    setSelector(chartSelector)
  }, [chartSelector, setSelector])

  return (
    null
  )
}

export default Chart;