import { FC, useEffect } from 'react'
import useChart from '../state/useChart'

// TODO make Chart render a spinner if it's fetching
const Chart: FC<any> = ({endpointPrefix, chartSelector, ...props}) => {
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