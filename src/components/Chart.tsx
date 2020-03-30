import { FC, useEffect } from 'react'
import useChart from '../state/useChart'

const Chart: FC<any> = ({endpointPrefix, ...props}) => {
  const { setEndpointPrefix } = useChart('#d3-stuff')

  useEffect(() => {
    setEndpointPrefix(endpointPrefix)
  }, [endpointPrefix, setEndpointPrefix])

  return (
    null
  )
}

export default Chart;