import React, { FC } from 'react'

import Spinner from './Spinner'

import useChart from '../state/useChart'

import { ChartProps } from '../types'

// TODO make Chart render a spinner if it's fetching
const Chart: FC<ChartProps> = ({ chartSelector }) => {
  const { isLoading } = useChart(chartSelector)

  const ToRender = isLoading ? <Spinner/> : null
  return (
    <>
      { ToRender }
    </>
  )
}

export default Chart;