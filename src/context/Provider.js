import React, { createContext, useContext, useReducer } from "react";
import { initialState } from "./initialStates/authInitialState";
import coursesInitialState from "./initialStates/coursesInitialState";
import coursesReducer from "./reducers/coursesReducer";
import loginReducer from "./reducers/loginReducer";


export const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
  const [loginState, dispatch] = useReducer(loginReducer, initialState);
  const [coursesState, coursesDispatch] = useReducer(coursesReducer, coursesInitialState)

  return (
    <GlobalContext.Provider value={{ loginState, dispatch, coursesState, coursesDispatch }}>
      {children}
    </GlobalContext.Provider >
  )

}

const useDataLayer = () => useContext(GlobalContext)
export default useDataLayer

