import React, { FC, useState, useContext, MouseEvent } from 'react'
import { ApiContext } from '../state/Context'

interface navObj {
  text : string
  path : string
}

interface NavProps {
  graph_options : navObj[],
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

  const handleChange = (path: string) => (event: MouseEvent) => {
    setPrimaryValue(path)
  }

  const handleSubmit = (event: MouseEvent) => {
    event.preventDefault()
    setEndpointPrefixWrap(primaryValue)
  }

  const MappedOptions = graph_options.map((option, i: number) => {
    return (
      <option onClick={handleChange(option.path)} key={i}>
        { option.text }
      </option>
    )
  })
  return (
    <nav>
      <select>
        { MappedOptions }
      </select>
      <button className='btn btn-primary' onClick={handleSubmit}>
        Go
      </button>
    </nav>
  )
}

export default NavBar