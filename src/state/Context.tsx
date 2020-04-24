import React, { createContext, FC, useState, useReducer } from 'react'

import { ContextVals } from '../types'

const initState = {
  endpoint: '',
}

const ApiContext = createContext<ContextVals>({
  endpointPrefix: '',
  state: initState,
  updateEndpointFn: (str: string) => console.log('hi'),
  setEndpointPrefixWrap: (endpoint: string) => console.log('hi'),
});


const Provider: FC = ({children}) => {
  const [endpointPrefix, setEndpointPrefix] = useState('');
  const [state, dispatch] = useReducer(reducer, initState)

  const setEndpointPrefixWrap = (endpoint: string) => setEndpointPrefix(endpoint)

  const dispatchUpdateEndpointWrap = (dispatch: React.Dispatch<any>) => (str: string) => dispatch({ type: 'UPDATE_ENDPOINT', payload: str })

  const dispatchEndpointUpdate = dispatchUpdateEndpointWrap(dispatch);


  return (
    <ApiContext.Provider
      value={{
        endpointPrefix,
        state,
        updateEndpointFn: dispatchEndpointUpdate,
        setEndpointPrefixWrap,
      }}
    >
      { children }
    </ApiContext.Provider>
  )
}

function reducer(state: any, { type, ...action}: any) {
  switch (type) {
    case 'UPDATE_ENDPOINT':
      return {
        ...state,
        endpoint: action.payload
      }
    default:
      return state
  }
}

export default Provider;
export { ApiContext }