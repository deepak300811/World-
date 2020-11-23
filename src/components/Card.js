import React from "react"
import { NavLink } from "react-router-dom"

function Card(props) {
  const { name, population, capital, region, flag, filter, input } = props
  return (
    <>
      <NavLink
        id="nav-link"
        to={`/${filter || "noFilter"}/country/${input || "noInput"}/${name}`}
        style={{ textDecoration: "none", color: "#000" }}
      >
        <div className="card">
          <div
            className="flag-part"
            style={{
              background: `url(${flag}) no-repeat center center/cover`
            }}
          ></div>
          <div className="lower-part">
            <p className="country-name">{name}</p>
            <div className="country-details">
              <span>
                {" "}
                <p>Population:</p>
                <p className="value">{population}</p>
              </span>
              <span>
                {" "}
                <p>Region:</p> <p className="value">{region}</p>
              </span>
              <span>
                {" "}
                <p>Capital:</p> <p className="value">{capital}</p>
              </span>
            </div>
          </div>
        </div>
      </NavLink>
    </>
  )
}

export default Card
