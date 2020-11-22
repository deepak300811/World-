import React, { useEffect, useState } from "react"
import axios from "axios"
import { convertPopulation } from "../utility/convertPopulation"

function RightDetails({ singleCountry }) {
  const [neighbours, setNeighbours] = useState([])
  const [error, setError] = useState("")
  const [isLoading, setIsloading] = useState(false)
  useEffect(() => {
    setIsloading(true)
    axios
      .get(
        `https://restcountries.eu/rest/v2/alpha?codes=${singleCountry.borders.join(
          ";"
        )}`
      )
      .then(response => {
        setNeighbours(prev => (prev.data = response.data))
        setIsloading(false)
      })
      .catch(error => {
        if (error.response.data.status === 400) {
          setError("No neighbours present")
          // console.log("error=", error.response.data)
          setIsloading(false)
        } else {
          setIsloading(false)
          setError("Something Went Wrong!")
        }
      })
  }, [])
  return (
    <>
      {singleCountry !== null &&
      singleCountry !== undefined &&
      singleCountry !== {} ? (
        <>
          <div className="details-heading">
            <h1>{singleCountry.name}</h1>
          </div>
          <div className="all-details">
            <div>
              <p>
                {" "}
                Native Name:{" "}
                <span className="value-light">{singleCountry.nativeName}</span>
              </p>
              <p>
                {" "}
                Population:{" "}
                <span className="value-light">
                  {convertPopulation(singleCountry.population)}
                </span>{" "}
              </p>
              <p>
                {" "}
                Region:{" "}
                <span className="value-light">{singleCountry.region}</span>
              </p>
              <p>
                {" "}
                Sub Region:{" "}
                <span className="value-light">{singleCountry.subregion}</span>
              </p>
              <p>
                {" "}
                Capital:{" "}
                <span className="value-light">{singleCountry.capital}</span>
              </p>
            </div>
            <div>
              <p>
                Top Level Domain:{" "}
                <span className="value-light">
                  {singleCountry.topLevelDomain[0]}
                </span>
              </p>
              <p>
                Currencies:{" "}
                <span className="value-light">
                  {singleCountry.currencies[0].name}
                </span>
              </p>
              <p>
                Languages:{" "}
                <span className="value-light">
                  {singleCountry.languages.map(lang => lang.name).join(", ")}
                </span>
              </p>
            </div>
          </div>
          <div className="border-countries">
            <p>Border Countries: </p>
            <div className="neighbout-box">
              {isLoading ? (
                <p>Loading...</p>
              ) : error !== null && error !== undefined && error !== "" ? (
                <p className="error-info">{error}</p>
              ) : (
                neighbours.map(neighbour => {
                  return (
                    <span
                      className="value-light btn-style neighbour"
                      key={neighbour.alpha2Code}
                    >
                      {neighbour.name}
                    </span>
                  )
                })
              )}
              {/* 
              <span className="value-light btn-style neighbour">
                Afghanistan
              </span> */}
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}

export default RightDetails
