import { createContext, useReducer } from 'react'

export const CeramicsContext = createContext()

export const ceramicsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CERAMICS':
      return { 
        ceramics: action.payload 
      }
    case 'CREATE_CERAMIC':
      return { 
        ceramics: [action.payload, ...state.ceramics] 
      }
    case 'DELETE_CERAMIC':
      return {
        ceramics: state.ceramics.filter(w => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const CeramicsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ceramicsReducer, { 
    ceramics: null
  })
  
  return (
    <CeramicsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </CeramicsContext.Provider>
  )
}