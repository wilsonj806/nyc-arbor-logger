import React, { createContext, FC, useState, useReducer } from 'react'

import { ContextVals } from '../types'

const initState = {
  endpoint: '',
}

const ApiContext = createContext<ContextVals>({
  state: initState,
  updateEndpointFn: (str: string) => console.log('hi'),
});


const Provider: FC = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initState)

  const dispatchUpdateEndpointWrap = (dispatch: React.Dispatch<any>) => (str: string) => dispatch({ type: 'UPDATE_ENDPOINT', payload: str })

  const dispatchEndpointUpdate = dispatchUpdateEndpointWrap(dispatch);


  return (
    <ApiContext.Provider
      value={{
        state,
        updateEndpointFn: dispatchEndpointUpdate,
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