import React, { useState, useEffect } from "react"
import RightDetails from "./RightDetails"
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace"
import axios from "axios"
import { darkModeToggle } from "../utility/darkModeToggle"
import { NavLink } from "react-router-dom"
import { LinearProgress } from "@material-ui/core"

function Details(props) {
  const [countryData, setCountryData] = useState([])
  const [error, setError] = useState("")
  const [isLoading, setIsloading] = useState(false)
  useEffect(() => {
    setIsloading(true)
    axios
      .get(
        `https://restcountries.eu/rest/v2/name/${props.match.params.name}?fullText=true`
      )
      .then(response => {
        setCountryData(prev => (prev.data = response.data))
        setIsloading(false)
      })
      .catch(error => {
        setIsloading(false)
        if (error.response.data.status === 404) {
          setError("Please enter valid country")
        } else {
          setError(
            error.response.data.message + " " + error.response.data.status
          )
        }
      })
  }, [])
  useEffect(() => {
    darkModeToggle(window.localStorage.getItem("mode"))
  }, [countryData, error])
  // console.log("from details=", props)
  return (
    <>
      {countryData !== null &&
      countryData !== undefined &&
      countryData.length !== 0 ? (
        <div className="container" id="select-country-holder">
          {}
          <>
            <div className="back-button">
              {(props.match.params.filter || props.match.params.input) && (
                <NavLink
                  className="btn-style"
                  id="nav-link"
                  to={`/${props.match.params.filter}/${props.match.params.input}`}
                  style={{ textDecoration: "none" }}
                  // onClick={() => props.history.goBack()}
                >
                  <KeyboardBackspaceIcon style={{ fontSize: "1.4rem" }} />{" "}
                  <p>Back</p>
                </NavLink>
              )}
            </div>
            <div className="details">
              <div
                className="flag"
                // style={{
                //   background: `url(${countryData[0].flag}) no-repeat center center/cover`
                // }}
              >
                <img src={countryData[0].flag} alt="" />
              </div>
              <div className="right-details">
                <RightDetails singleCountry={{ ...countryData[0] }} />
              </div>
            </div>
          </>
        </div>
      ) : isLoading ? (
        <LinearProgress />
      ) : error ? (
        <p id="error-det-div">{error}</p>
      ) : (
        ""
      )}
    </>
  )
}

export default Details
