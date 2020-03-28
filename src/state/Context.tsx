import React, { createContext, FC, useState } from 'react'


interface ContextVals {
  primaryEndpoint: string
  endpointPrefix: string
  setEndpointPrefixWrap: (endpoint: string) => void
}

const ApiContext = createContext<ContextVals>({
  primaryEndpoint: 'https://localhost:5000',
  endpointPrefix: '',
  setEndpointPrefixWrap: (endpoint: string) => console.log('hi')
});

const primaryEndpoint = process.env.NODE_ENV === 'production' ? 'https://nyc-tree-data-fetcher.herokuapp.com' : 'https://localhost:5000'

const Provider: FC<any> = ({children}) => {
  const [endpointPrefix, setEndpointPrefix] = useState('');
  const setEndpointPrefixWrap = (endpoint: string) => setEndpointPrefix(endpoint)

  return (
    <ApiContext.Provider
      value={{
        primaryEndpoint,
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