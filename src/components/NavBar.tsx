import React, { FC, useState, useContext, FormEvent } from 'react'
import { ApiContext } from '../state/Context'

interface navObj {
  text : string
  path : string
}

interface NavProps {
  graph_options ?: navObj[],
  sub_options ?: string[],
  handleChange ?: any
}

const defaultProp: NavProps = {
  graph_options: [
    Object.assign({}, { text: 'Select an option', path: '' }),
    Object.assign({}, { text: 'Qty Trees Per Borough', path: '/data/count' }),
    Object.assign({},{ text: 'Qty of Each Tree Species', path: '/data/species' }),
  ],
}

const NavBar: FC<NavProps> = (props = defaultProp) => {
  const { graph_options } = props;
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

  const MappedOptions = graph_options ? graph_options.map((option, i: number) => {
    return (
      <option value={option.path} key={i}>
        { option.text }
      </option>
    )
  }) : defaultProp!.graph_options!.map((option, i: number) => {
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

export default NavBar