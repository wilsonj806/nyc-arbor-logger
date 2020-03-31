import React, { createContext, FC, useState } from 'react'


interface ContextVals {
  endpointPrefix: string
  setEndpointPrefixWrap: (endpoint: string) => void
  [key: string] : any
}

const ApiContext = createContext<ContextVals>({
  endpointPrefix: '',
  setEndpointPrefixWrap: (endpoint: string) => console.log('hi'),
});


const Provider: FC<any> = ({children}) => {
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