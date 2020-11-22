import React, { useState, useEffect } from "react"
import axios from "axios"
import Card from "./Card"
import SearchIcon from "@material-ui/icons/Search"
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown"
import { darkModeToggle } from "../utility/darkModeToggle"
import { LinearProgress } from "@material-ui/core"
import { convertPopulation } from "../utility/convertPopulation"
// import { Context } from "../utility/Context"

function CountriesGrid(props) {
  useEffect(() => {
    darkModeToggle(window.localStorage.getItem("mode"))
  }, [])
  const [inputText, setInputText] = useState("")
  const [countries, setCountries] = useState([])
  const [filterSelection, setFilterSelection] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsloading] = useState(false)
  const [requestCount, setRequestCount] = useState(0)
  const [reqFilterCount, setReqFilterCount] = useState(0)
  console.log(props)
  useEffect(() => {
    if (
      props.match.params.filterName !== undefined &&
      props.match.params.filterName !== null &&
      props.match.params.filterName !== "noFilter"
    ) {
      document.querySelector("#selected-filter").innerHTML =
        props.match.params.filterName
      setFilterSelection(props.match.params.filterName)
    } else if (
      props.match.params.countryName !== undefined &&
      props.match.params.countryName !== null &&
      props.match.params.countryName !== "noInput"
    ) {
      setRequestCount(prev => prev + 1)
    } else if (
      (props.match.params.countryName === undefined ||
        props.match.params.countryName === null ||
        props.match.params.countryName === "noInput") &&
      (props.match.params.filterName === undefined ||
        props.match.params.filterName === null ||
        props.match.params.filterName === "noFilter")
    ) {
      setRequestCount(prev => prev + 1)
    }
  }, [])
  useEffect(() => {
    window.addEventListener("click", event => {
      try {
        if (
          event.path !== undefined &&
          event.path.filter(pth => pth.id === "for-closing").length === 0 &&
          document.getElementById("reg-list") !== null &&
          document.getElementById("reg-list") !== undefined
        ) {
          document.getElementById("reg-list").style.display = "none"
        }
      } catch (error) {
        console.log(error)
      }
    })
    return () => {
      window.removeEventListener("click", handleDropDown)
    }
  }, [])

  useEffect(() => {
    setIsloading(true)
    setError("")
    let delay = null
    document.getElementById("reg-list").style.display = "none"
    if (inputText.trim() === "" || inputText.trim() === null) {
      setCountries([])
      setIsloading(false)
      setReqFilterCount(prev => prev + 1)
    } else {
      delay = setTimeout(() => {
        setRequestCount(prev => prev + 1)
      }, 700)
    }
    return () => clearTimeout(delay)
  }, [inputText])

  useEffect(() => {
    if (reqFilterCount > 0) {
      if (
        filterSelection !== null &&
        filterSelection !== "" &&
        filterSelection !== undefined
      ) {
        axios
          .get(`https://restcountries.eu/rest/v2/region/${filterSelection}`)
          .then(response => {
            setIsloading(false)
            setCountries(response.data)
          })
          .catch(error => {
            setIsloading(false)
            if (error.response.data.status === 404) {
              setError("Please select valid region")
            } else {
              setError(
                error.response.data.message + " " + error.response.data.status
              )
            }
          })
      }
    }
  }, [reqFilterCount])

  useEffect(() => {
    setError("")

    setCountries([])
    setInputText("")

    if (
      !(
        filterSelection === "" ||
        filterSelection === null ||
        filterSelection === undefined
      )
    ) {
      let url = ""
      if (filterSelection === "All") {
        url = "https://restcountries.eu/rest/v2/all"
      } else {
        url = `https://restcountries.eu/rest/v2/region/${filterSelection}`
      }
      setIsloading(true)
      axios
        .get(url)
        .then(response => {
          setIsloading(false)
          setCountries(response.data)
          if (
            props.match.params.filterName !== undefined &&
            props.match.params.filterName !== null &&
            props.match.params.filterName !== "noFilter" &&
            props.match.params.countryName !== undefined &&
            props.match.params.countryName !== null &&
            props.match.params.countryName !== "noInput" &&
            requestCount === 0
          ) {
            setRequestCount(prev => prev + 1)
          }
        })
        .catch(error => {
          setIsloading(false)
          if (error.response.data.status === 404) {
            setError("Please select valid region")
          } else {
            setError(
              error.response.data.message + " " + error.response.data.status
            )
          }
        })
    }
  }, [filterSelection])

  useEffect(() => {
    if (requestCount) {
      setIsloading(true)
      let url = ""

      if (
        props.match.params.countryName !== undefined &&
        props.match.params.countryName !== null &&
        requestCount === 1 &&
        props.match.params.countryName !== "noInput"
      ) {
        url = `https://restcountries.eu/rest/v2/name/${props.match.params.countryName.trim()}`
        setInputText(props.match.params.countryName)
      } else {
        if (
          (props.match.params.countryName === undefined ||
            props.match.params.countryName === null ||
            props.match.params.countryName === "noInput") &&
          (props.match.params.filterName === undefined ||
            props.match.params.filterName === null ||
            props.match.params.filterName === "noFilter") &&
          requestCount === 1
        ) {
          url = "https://restcountries.eu/rest/v2/all"
        } else {
          url = `https://restcountries.eu/rest/v2/name/${inputText.trim()}`
        }
      }
      axios
        .get(url)
        .then(response => {
          setIsloading(false)
          // console.log(response)
          let temp = response.data.filter(prop => {
            if (
              filterSelection === "All" ||
              filterSelection === "" ||
              filterSelection === null
            ) {
              return true
            } else {
              return prop.region.toUpperCase() === filterSelection.toUpperCase()
            }
          })
          setCountries(prev => (prev.countries = temp))
          if (
            (countries.countries.length === 0 ||
              countries.countries[0] === undefined) &&
            inputText.trim().length > 1
          ) {
            setError(
              `${inputText} not present in ${filterSelection} region. Kindly change filter.`
            )
          }
        })
        .catch(error => {
          setIsloading(false)
          console.log("unhandled=", error.reponse)
          if (error.response.data.status === 404) {
            setError("Please enter valid country")
          } else {
            setError(
              error.response.data.message + " " + error.response.data.status
            )
          }
        })
    }
  }, [requestCount])

  const handleInputText = e => {
    const temp = e.target.value
    setInputText(prev => temp)
  }

  const handleFilter = e => {
    e.preventDefault()
    document.getElementById("reg-list").style.display = "none"
    const temp = e.target.innerText
    document.querySelector("#selected-filter").innerHTML = temp

    setFilterSelection(temp)
  }
  function handleDropDown() {
    if (document.getElementById("reg-list").style.display === "block") {
      document.getElementById("reg-list").style.display = "none"
    } else {
      document.getElementById("reg-list").style.display = "block"
    }
    return
  }
  return (
    <>
      {isLoading && <LinearProgress />}

      <div className="container" id="holder-container">
        <div className="search-filter">
          <div className="search-box">
            <SearchIcon style={{ color: "hsl(0, 0%, 52%)" }} id="search-icon" />
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search for a country..."
              autoComplete="off"
              value={inputText}
              onChange={e => handleInputText(e)}
            />
          </div>
          <div className="filter-box">
            <div onClick={handleDropDown} id="for-closing">
              <p id="selected-filter">Filter by Region</p>

              <span>
                <KeyboardArrowDownIcon style={{ fontSize: "1.1rem" }} />
              </span>
            </div>
            <div className="region-list" id="reg-list">
              <ul>
                <li id={0} onClick={e => handleFilter(e)}>
                  All
                </li>
                <li id={1} onClick={e => handleFilter(e)}>
                  Africa
                </li>
                <li id={2} onClick={e => handleFilter(e)}>
                  Americas
                </li>
                <li id={3} onClick={e => handleFilter(e)}>
                  Asia
                </li>
                <li id={4} onClick={e => handleFilter(e)}>
                  Europe
                </li>
                <li id={5} onClick={e => handleFilter(e)}>
                  Oceania
                </li>
              </ul>
            </div>
          </div>
        </div>

        {error ? (
          <p id="error-div">{error}</p>
        ) : (
          <div className="cards-holder">
            {countries.map(item => {
              // console.log(item)
              let population = convertPopulation(item.population)
              return (
                <Card
                  key={item.alpha2Code}
                  name={item.name}
                  population={population}
                  capital={item.capital}
                  region={item.region}
                  flag={item.flag}
                  input={inputText}
                  filter={filterSelection}
                />
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}

export default CountriesGrid
