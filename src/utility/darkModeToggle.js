export const darkModeToggle = mode => {
  let errorDetDiv = document.getElementById("error-det-div")
  if (mode === "Dark") {
    document.getElementById("header").classList.add("dark")
    document.getElementsByTagName("BODY")[0].classList.add("dark")
    let docVar = document.getElementById("holder-container")
    let holderDet = document.getElementById("select-country-holder")
    document.documentElement.style.setProperty(
      "--bbox-shadow",
      "0px 0px 0px 0px"
    )
    if (docVar !== null) {
      // console.log(docVar)
      document.getElementById("search").focus()
      document.getElementById("holder-container").classList.add("dark")

      document.documentElement.style.setProperty(
        "--bbox-shadow",
        "0px 0px 0px 0px"
      )
      document.getElementById("search-icon").style.color = "#fff"

      document.querySelector(".search-filter").classList.add("dark")
    }
    if (holderDet !== null) {
      document.getElementById("select-country-holder").classList.add("dark")
      document.documentElement.style.setProperty(
        "--white-mode-neighbour-shadow",
        "0px 0px 4px 2px #24313d"
      )
      document.documentElement.style.setProperty(
        "--white-mode-button-shadow",
        "0px 0px 4px 2px #24313d"
      )
    }
    if (errorDetDiv !== null) {
      errorDetDiv.style.color = "#fff"
    }
  } else if (mode === "Light") {
    document.getElementById("header").classList.remove("dark")
    document.getElementsByTagName("BODY")[0].classList.remove("dark")
    let docVar = document.getElementById("holder-container")
    let holderDet = document.getElementById("select-country-holder")
    document.documentElement.style.setProperty(
      "--bbox-shadow",
      "0px -2px 16px -2px #c4c4c4"
    )
    if (docVar !== null) {
      // console.log(docVar)
      document.getElementById("holder-container").classList.remove("dark")

      document.getElementById("search-icon").style.color = "rgb(133, 133, 133)"

      document.querySelector(".search-filter").classList.remove("dark")
    }
    if (holderDet !== null) {
      document.getElementById("select-country-holder").classList.remove("dark")
      document.documentElement.style.setProperty(
        "--white-mode-neighbour-shadow",
        "0px 0px 6px 1px #c4c4c4"
      )
      document.documentElement.style.setProperty(
        "--white-mode-button-shadow",
        "0px 0px 4px 0px #c4c4c4"
      )
    }
    if (errorDetDiv !== null) {
      errorDetDiv.style.color = "#000"
    }
  }
}
