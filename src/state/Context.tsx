import React, { createContext, FC, useState } from 'react'

import { ContextVals } from '../types'

const ApiContext = createContext<ContextVals>({
  endpointPrefix: '',
  setEndpointPrefixWrap: (endpoint: string) => console.log('hi'),
});


const Provider: FC = ({children}) => {
  const [endpointPrefix, setEndpointPrefix] = useState('');
  const setEndpointPrefixWrap = (endpoint: string) => setEndpointPrefix(endpoint)

  return (
    <ApiContext.Provider
      value={{
        endpointPrefix,
        setEndpointPrefixWrap,
      }}
    >
      { children }
    </ApiContext.Provider>
  )
}

export default Provider;
export { ApiContext }