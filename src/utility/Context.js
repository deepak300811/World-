import React, { useState } from "react"

export const Context = React.createContext()

const ContextProvider = props => {
  const [inputText, setInputText] = useState("")
  const [countries, setCountries] = useState([])
  return (
    <Context.Provider
      value={{ inputText, setInputText, countries, setCountries }}
    >
      {props.children}
    </Context.Provider>
  )
}

export default ContextProvider
