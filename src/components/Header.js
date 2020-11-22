import React, { useEffect, useState } from "react"
import Brightness4OutlinedIcon from "@material-ui/icons/Brightness4Outlined"
import { darkModeToggle } from "../utility/darkModeToggle"
function Header() {
  // const [mode, setMode] = useState("")
  useEffect(() => {
    let tempMode = window.localStorage.getItem("mode")
    if (tempMode !== undefined && tempMode !== null) {
      darkModeToggle(tempMode)
    } else {
      window.localStorage.setItem("mode", "Light")
      darkModeToggle("Light")
    }
  }, [])

  // useEffect(() => darkModeToggle(window.localStorage.getItem("mode")), [mode])

  // useEffect(() => {
  //   if (mode === "Light") {
  //     window.localStorage.setItem("mode", "Dark")
  //     setMode("Dark")
  //   } else if (mode === "Dark") {
  //     window.localStorage.setItem("mode", "Light")
  //     setMode("Light")
  //   }
  // }, [val > 0])

  const handleInc = () => {
    const myStore = window.localStorage.getItem("mode")
    if (myStore === "Light") {
      window.localStorage.setItem("mode", "Dark")
      darkModeToggle("Dark")
    } else if (myStore === "Dark") {
      window.localStorage.setItem("mode", "Light")
      darkModeToggle("Light")
    }
  }

  return (
    <>
      <div id="header">
        <div className="container">
          <div className="left">
            <h2>Where in the world?</h2>
          </div>
          <div className="right">
            <Brightness4OutlinedIcon
              id="toggle-icon"
              onClick={handleInc}
              style={{ cursor: "pointer" }}
            />
            <p>Dark Mode</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
