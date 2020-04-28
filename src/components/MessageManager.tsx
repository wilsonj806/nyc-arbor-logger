import React, { useContext } from 'react'
import { ApiContext } from '../state/Context'

import './message.css'

// TODO add message closing
const MessageManager = () => {
  const { state } = useContext(ApiContext)
  const { message } = state;

  const style = (message === '') ? { background: 'transparent' } : { background: 'rgb(248, 30, 30)',   boxShadow: '2px 2px 4px rgba(44, 44, 44, 0.25)'
}

  return (
    <section className='message' style={style} role='alert'>
      <p>{ message }</p>
    </section>
  )
}

export default MessageManager