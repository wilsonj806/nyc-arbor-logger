import React, { FC, useState, useContext, FormEvent } from 'react'
import { ApiContext } from '../state/Context'

import './nav.css'

import { NavProps } from '../types'


const SecondaryArr = [
  { text: 'Select Boro', path: '' },
  { text: 'Bronx', path: '/data/bronx/species' },
  { text: 'Brooklyn', path: '/data/brooklyn/species' },
  { text: 'Manhattan', path: '/data/manhattan/species' },
  { text: 'Queens', path: '/data/manhattan/species' },
  { text: 'Staten Island', path: '/data/staten%20island/species' },
]

const NavBar: FC<NavProps> = (props) => {
  const { setEndpointPrefixWrap } = useContext(ApiContext)

  const [primaryValue, setPrimaryValue] = useState('')
  const [shouldRenderSecondary, setRenderSecondary] = useState(false)

  const handleChange = (event: FormEvent) => {
    const target = event.target as any
    console.dir(target)
    if (target.value === 'true') {
      setRenderSecondary(true)
    } else if (target.dataset.secondary !== 'true' && shouldRenderSecondary) {
      setRenderSecondary(false)
      setPrimaryValue(target.value)
    }
    else {
      setPrimaryValue(target.value)
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setEndpointPrefixWrap(primaryValue)
  }

  const MappedOptions = props.graph_options!.map((option, i: number) => {
    return (
      <option value={option.isSecondary || option.path} key={i}>
        { option.text }
      </option>
    )
  })

  const SecondaryOptions = shouldRenderSecondary ? (
    <label>
      <span>Choose a Borough:</span>
      <select className="select--primary" onChange={handleChange} data-secondary={true}>
        { SecondaryArr.map((row, i) => (
        <option value={row.path} key={i}>
          { row.text }
        </option>
        )) }
      </select>
    </label>
  ) : null

  return (
    <div className='ctr-nav'>
      <nav>
        <label>
          Choose an option:
          <select className="select--primary" onChange={handleChange}>
            { MappedOptions }
          </select>
        </label>
        { SecondaryOptions }
        <button className='btn btn-primary' onClick={handleSubmit}>
          Go
        </button>
      </nav>
    </div>
  )
}

NavBar.defaultProps = {
  graph_options: [
    Object.assign({}, { text: 'Select an option', path: '' }),
    Object.assign({}, { text: 'Qty Trees Per Borough', path: '/data/count' }),
    Object.assign({},{ text: 'Qty of Each Tree Species', path: '/data/species' }),
    Object.assign({},{ text: 'Qty of Each Tree Species in a Borough', path: '', isSecondary: 'true' as string }),
  ],
}

export default NavBar