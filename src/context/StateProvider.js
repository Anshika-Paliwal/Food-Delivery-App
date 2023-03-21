import React, { createContext, useContext, useReducer } from 'react'

export const StateContext = createContext();

// Prop
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}> 
        {children}
    </StateContext.Provider>
);

// Custom hook to update state value
export const useStateValue = () => useContext(StateContext);