import React, { FC, useState, useContext, FormEvent } from 'react'
import { ApiContext } from '../state/Context'

import { NavProps } from '../types'

const NavBar: FC<NavProps> = (props) => {
  const { setEndpointPrefixWrap } = useContext(ApiContext)

  const [primaryValue, setPrimaryValue] = useState('')

  const handleChange = (event: FormEvent) => {
    const target = event.target as any
    setPrimaryValue(target.value)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setEndpointPrefixWrap(primaryValue)
  }

  const MappedOptions = props.graph_options!.map((option, i: number) => {
    return (
      <option value={option.path} key={i}>
        { option.text }
      </option>
    )
  })
  return (
    <nav>
      <select onChange={handleChange}>
        { MappedOptions }
      </select>
      <button className='btn btn-primary' onClick={handleSubmit}>
        Go
      </button>
    </nav>
  )
}

NavBar.defaultProps = {
  graph_options: [
    Object.assign({}, { text: 'Select an option', path: '' }),
    Object.assign({}, { text: 'Qty Trees Per Borough', path: '/data/count' }),
    Object.assign({},{ text: 'Qty of Each Tree Species', path: '/data/species' }),
  ],
}

export default NavBar