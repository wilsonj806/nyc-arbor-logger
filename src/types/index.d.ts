/// <reference types="react" />


declare namespace ArborLoggerTypes {
  interface ContextVals {
    endpointPrefix: string
    setEndpointPrefixWrap: (endpoint: string) => void
  }

  interface navObj {
    text : string
    path : string
    isSecondary ?: string
  }

  interface NavProps {
    graph_options ?: navObj[],
    sub_options ?: string[],
    handleChange ?: any
  }

  interface ChartProps {
    endpointPrefix: string
    chartSelector: string
  }

  interface ModalProps {
    shouldDisplay: boolean
  }
  
}

declare module 'ArborLoggerTypes' {
  export = ArborLoggerTypes
}
export = ArborLoggerTypes
export as namespace AppTypes
