import React, { createContext, FC, useState, useReducer } from 'react'

import { ContextVals } from '../types'

const initState = {
  endpoint: '',
  message: ''
}

const ApiContext = createContext<ContextVals>({
  state: initState,
  updateMessageFn: (str: string) => console.log('hi'),
  updateEndpointFn: (str: string) => console.log('hi'),
});


const Provider: FC = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initState)

  const dispatchUpdateEndpointWrap = (dispatch: React.Dispatch<any>) => (str: string) => dispatch({ type: 'UPDATE_ENDPOINT', payload: str })

  const dispatchUpdateMessageWrap = (dispatch: React.Dispatch<any>) => (str: string) => dispatch({ type: 'UPDATE_MESSAGE', payload: str })

  const dispatchEndpointUpdate = dispatchUpdateEndpointWrap(dispatch);

  const dispatchUpdateMessage = dispatchUpdateMessageWrap(dispatch);


  return (
    <ApiContext.Provider
      value={{
        state,
        updateMessageFn: dispatchUpdateMessage,
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
    case 'UPDATE_MESSAGE':
      return {
        ...state,
        message: action.payload
      }
    default:
      return state
  }
}

export default Provider;
export { ApiContext }